import initialDb from "../../mock-api/db.json";

const STORAGE_KEY = "capacity_connect_learner_db_v1";

const getStoredData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.warn("Could not read from localStorage, using initialDb:", error);
  }
  return JSON.parse(JSON.stringify(initialDb));
};

const saveStoredData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("Could not save to localStorage:", error);
  }
};

let currentStore = getStoredData();

export const getStore = () => currentStore;

export const updateStore = (updater) => {
  const nextData = updater(currentStore);
  currentStore = nextData;
  saveStoredData(currentStore);
  return currentStore;
};

export const resetStore = () => {
  currentStore = JSON.parse(JSON.stringify(initialDb));
  saveStoredData(currentStore);
  return currentStore;
};
