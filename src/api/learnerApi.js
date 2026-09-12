import { getStore, updateStore } from "./mockData";

export const getLearnerProfile = async () => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 150));
  const store = getStore();
  return { ...store.learner };
};

export const updateLearnerProfile = async (updatedFields) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  let updated;
  updateStore((store) => {
    store.learner = {
      ...store.learner,
      ...updatedFields,
    };
    updated = { ...store.learner };
    return store;
  });
  return updated;
};

export const getLearnerStats = async () => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const store = getStore();
  return {
    learningProgress: store.learner.learningProgress,
    coursesCompleted: store.learner.coursesCompleted,
    coursesInProgress: store.learner.coursesInProgress,
    totalLearningHours: store.learner.totalLearningHours,
    streakDays: store.learner.streakDays,
    certificatesEarned: store.certificates ? store.certificates.length : store.learner.certificatesEarned,
  };
};

export default {
  getLearnerProfile,
  updateLearnerProfile,
  getLearnerStats,
};
