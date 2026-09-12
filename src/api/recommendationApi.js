import { getStore } from "./mockData";
import { getSkillGaps } from "./skillApi";

export const getRecommendations = async () => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const store = getStore();
  const gaps = await getSkillGaps();
  const courses = store.courses;

  // Transparent Rule-Based Engine
  // 1. Prioritize skills with gap > 0 sorted by largest gap
  // 2. Find courses that teach or match the gap skill
  // 3. Compose a human-readable explanation
  const recommendations = [];

  for (const gapItem of gaps) {
    if (gapItem.gap <= 0) continue;

    const matchingCourses = courses.filter((c) =>
      c.skills.some(
        (sk) =>
          sk.toLowerCase() === gapItem.skill.toLowerCase() ||
          gapItem.skill.toLowerCase().includes(sk.toLowerCase()) ||
          sk.toLowerCase().includes(gapItem.skill.toLowerCase())
      )
    );

    for (const course of matchingCourses) {
      if (recommendations.some((r) => r.courseId === course.id)) continue;

      let priority = "Medium Priority";
      if (gapItem.gap >= 3) priority = "Highest Priority";
      else if (gapItem.gap === 2) priority = "High Priority";

      recommendations.push({
        id: `rec_${course.id}`,
        courseId: course.id,
        course,
        skill: gapItem.skill,
        gap: gapItem.gap,
        priority,
        difficulty: course.difficulty,
        reason: `Recommended because your ${gapItem.skill} skill is ${gapItem.gap} levels below target (Target: ${gapItem.targetLevel}, Current: ${gapItem.currentLevel}).`,
        estimatedTimeToClose: course.duration,
        matchScore: Math.min(99, 75 + gapItem.gap * 8),
      });
    }
  }

  // Fallback if no specific gaps
  if (recommendations.length < 3) {
    const unenrolled = courses.filter((c) => !recommendations.some((r) => r.courseId === c.id));
    for (const course of unenrolled) {
      if (recommendations.length >= 4) break;
      recommendations.push({
        id: `rec_${course.id}`,
        courseId: course.id,
        course,
        skill: course.skills[0] || "General Competency",
        gap: 1,
        priority: "Suggested",
        difficulty: course.difficulty,
        reason: `Suggested for general capacity building in ${course.category}.`,
        estimatedTimeToClose: course.duration,
        matchScore: 80,
      });
    }
  }

  return recommendations;
};

export default {
  getRecommendations,
};
