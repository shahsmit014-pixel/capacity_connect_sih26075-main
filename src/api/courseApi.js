import { getStore, updateStore } from "./mockData";

export const getCourses = async (filters = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const store = getStore();
  let list = [...store.courses];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.trainer.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q))
    );
  }

  if (filters.category && filters.category !== "All") {
    list = list.filter((c) => c.category === filters.category);
  }

  if (filters.difficulty && filters.difficulty !== "All") {
    list = list.filter((c) => c.difficulty.toLowerCase().includes(filters.difficulty.toLowerCase()));
  }

  if (filters.skill && filters.skill !== "All") {
    list = list.filter((c) => c.skills.includes(filters.skill));
  }

  if (filters.status && filters.status !== "All") {
    list = list.filter((c) => c.status === filters.status);
  }

  if (filters.sortBy) {
    if (filters.sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === "title") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sortBy === "duration") {
      list.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    }
  }

  return list;
};

export const getCourseById = async (courseId) => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const store = getStore();
  const course = store.courses.find((c) => c.id === courseId);
  if (!course) {
    throw new Error(`Course with ID ${courseId} not found`);
  }
  return { ...course };
};

export const getMyLearningCourses = async (tab = "all") => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const store = getStore();
  const enrolled = store.courses.filter((c) => c.enrolled);

  if (tab === "in-progress") {
    return enrolled.filter((c) => c.status === "in-progress");
  }
  if (tab === "completed") {
    return enrolled.filter((c) => c.status === "completed");
  }
  if (tab === "not-started") {
    return enrolled.filter((c) => c.status === "not-started" || c.progress === 0);
  }
  return enrolled;
};

export const getActiveCourse = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const store = getStore();
  // Find in-progress course, preferably with highest progress < 100
  const inProgress = store.courses.find((c) => c.enrolled && c.status === "in-progress");
  return inProgress || store.courses.find((c) => c.enrolled) || store.courses[0];
};

export const enrollInCourse = async (courseId) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  let updatedCourse;
  updateStore((store) => {
    const courseIndex = store.courses.findIndex((c) => c.id === courseId);
    if (courseIndex !== -1) {
      store.courses[courseIndex] = {
        ...store.courses[courseIndex],
        enrolled: true,
        status: "in-progress",
        progress: store.courses[courseIndex].progress || 10,
      };
      updatedCourse = store.courses[courseIndex];
      store.learner.coursesInProgress = store.courses.filter(
        (c) => c.enrolled && c.status === "in-progress"
      ).length;

      // Add notification
      store.notifications.unshift({
        id: `notif_${Date.now()}`,
        type: "course",
        title: `Enrolled in ${updatedCourse.title}`,
        message: "Your enrollment is confirmed. Start your first module now.",
        time: "Just now",
        unread: true,
        link: `/learner/courses/${courseId}/learn`,
      });
    }
    return store;
  });
  return updatedCourse;
};

export const completeModule = async (courseId, moduleId) => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  let updatedCourse;
  updateStore((store) => {
    const courseIndex = store.courses.findIndex((c) => c.id === courseId);
    if (courseIndex !== -1) {
      const course = store.courses[courseIndex];
      const modules = course.modules.map((m) =>
        m.id === moduleId ? { ...m, completed: true } : m
      );
      const completedCount = modules.filter((m) => m.completed).length;
      const progress = Math.round((completedCount / modules.length) * 100);
      const isComplete = completedCount === modules.length;

      store.courses[courseIndex] = {
        ...course,
        modules,
        completedModules: completedCount,
        progress,
        status: isComplete ? "completed" : "in-progress",
      };
      updatedCourse = store.courses[courseIndex];

      // Update learner progress
      const totalEnrolled = store.courses.filter((c) => c.enrolled);
      const totalProgress = totalEnrolled.reduce((acc, curr) => acc + curr.progress, 0);
      store.learner.learningProgress = Math.round(totalProgress / (totalEnrolled.length || 1));
      store.learner.coursesCompleted = store.courses.filter((c) => c.status === "completed").length;
    }
    return store;
  });
  return updatedCourse;
};

export const getQuizByCourseId = async (courseId, quizId) => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const store = getStore();
  let quiz = store.quizzes.find((q) => q.id === quizId || q.courseId === courseId);
  if (!quiz && store.quizzes.length > 0) {
    quiz = store.quizzes[0];
  }
  return quiz ? { ...quiz } : null;
};

export const submitQuizAttempt = async (courseId, quizId, userAnswers) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const store = getStore();
  const quiz = store.quizzes.find((q) => q.id === quizId || q.courseId === courseId) || store.quizzes[0];

  let correctCount = 0;
  const questionsReview = quiz.questions.map((q) => {
    const userAnswer = userAnswers[q.id];
    const isCorrect = userAnswer === q.correctIndex;
    if (isCorrect) correctCount++;
    return {
      ...q,
      userAnswer,
      isCorrect,
    };
  });

  const scorePercentage = Math.round((correctCount / quiz.questions.length) * 100);
  const passed = scorePercentage >= quiz.passingScore;
  const attemptId = `att_${Date.now()}`;

  if (passed) {
    // Automatically trigger course completion, skill level-up, and certificate generation
    updateStore((s) => {
      const courseIndex = s.courses.findIndex((c) => c.id === courseId);
      if (courseIndex !== -1) {
        const c = s.courses[courseIndex];
        const allModulesCompleted = c.modules.map((m) => ({ ...m, completed: true }));
        s.courses[courseIndex] = {
          ...c,
          modules: allModulesCompleted,
          completedModules: allModulesCompleted.length,
          progress: 100,
          status: "completed",
        };

        // Level up relevant skill (e.g. Backend Fundamentals: 1 -> 4)
        const relevantSkill = s.skills.find(
          (sk) => sk.skill.toLowerCase().includes("backend") || c.skills.includes(sk.skill)
        );
        if (relevantSkill) {
          relevantSkill.currentLevel = Math.min(relevantSkill.targetLevel, relevantSkill.currentLevel + 3);
          relevantSkill.gap = Math.max(0, relevantSkill.targetLevel - relevantSkill.currentLevel);
          relevantSkill.status = relevantSkill.gap <= 0 ? "On Target" : "Near Target";
        }

        // Generate Certificate
        const newCertId = `cert_${Date.now()}`;
        s.certificates.unshift({
          id: newCertId,
          courseId: c.id,
          courseTitle: c.title,
          title: `Certificate of Competency in ${c.title}`,
          issueDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          credentialId: `CC-CERT-2026-${Math.floor(10000 + Math.random() * 90000)}`,
          grade: `Distinction (${scorePercentage}%)`,
          issuedBy: "Capacity Connect & National Digital Capacity Framework",
          signerName: c.trainer,
          signerTitle: c.trainerTitle || "Lead Technical Instructor",
          thumbnail: c.thumbnail,
        });

        // Add Certificate notification
        s.notifications.unshift({
          id: `notif_${Date.now()}`,
          type: "certificate",
          title: `Certificate Issued: ${c.title}`,
          message: `Congratulations! You scored ${scorePercentage}% and earned your verified credential.`,
          time: "Just now",
          unread: true,
          link: "/learner/certificates",
        });

        // Update learner metrics
        s.learner.coursesCompleted = s.courses.filter((course) => course.status === "completed").length;
        s.learner.certificatesEarned = s.certificates.length;
        s.learner.learningProgress = Math.min(100, s.learner.learningProgress + 15);
      }
      return s;
    });
  }

  return {
    attemptId,
    courseId,
    quizId,
    passed,
    score: scorePercentage,
    passingScore: quiz.passingScore,
    correctCount,
    totalQuestions: quiz.questions.length,
    questionsReview,
  };
};

export default {
  getCourses,
  getCourseById,
  getMyLearningCourses,
  getActiveCourse,
  enrollInCourse,
  completeModule,
  getQuizByCourseId,
  submitQuizAttempt,
};
