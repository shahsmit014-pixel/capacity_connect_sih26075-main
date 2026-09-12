import { getStore, updateStore } from "./mockData";

export const calculateGap = (target, current) => target - current;

export const getSkillStatus = (gap) => {
  if (gap <= 0) return "On Target";
  if (gap === 1) return "Near Target";
  return "Skill Gap";
};

export const getSkills = async () => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const store = getStore();
  return store.skills.map((s) => {
    const gap = calculateGap(s.targetLevel, s.currentLevel);
    return {
      ...s,
      gap,
      status: getSkillStatus(gap),
    };
  });
};

export const getSkillGaps = async () => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const store = getStore();
  const skillsWithGaps = store.skills
    .map((s) => {
      const gap = calculateGap(s.targetLevel, s.currentLevel);
      return {
        ...s,
        gap,
        status: getSkillStatus(gap),
      };
    })
    .sort((a, b) => b.gap - a.gap);

  return skillsWithGaps;
};

export const getBiggestGap = async () => {
  const gaps = await getSkillGaps();
  return gaps.length > 0 && gaps[0].gap > 0 ? gaps[0] : null;
};

export const updateSkillLevel = async (skillId, newLevel) => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  let updated;
  updateStore((store) => {
    const idx = store.skills.findIndex((s) => s.id === skillId);
    if (idx !== -1) {
      store.skills[idx].currentLevel = newLevel;
      const gap = calculateGap(store.skills[idx].targetLevel, newLevel);
      store.skills[idx].gap = gap;
      store.skills[idx].status = getSkillStatus(gap);
      updated = { ...store.skills[idx] };
    }
    return store;
  });
  return updated;
};

export default {
  getSkills,
  getSkillGaps,
  getBiggestGap,
  updateSkillLevel,
  calculateGap,
  getSkillStatus,
};
