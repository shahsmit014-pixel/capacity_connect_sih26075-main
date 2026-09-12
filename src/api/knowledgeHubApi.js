import { getStore } from "./mockData";

export const getResources = async (filters = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const store = getStore();
  let list = [...store.knowledgeResources];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.topic.toLowerCase().includes(q)
    );
  }

  if (filters.category && filters.category !== "All") {
    list = list.filter((r) => r.category === filters.category);
  }

  if (filters.type && filters.type !== "All") {
    list = list.filter((r) => r.type.toLowerCase() === filters.type.toLowerCase());
  }

  return list;
};

export const getResourceById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 120));
  const store = getStore();
  const resource = store.knowledgeResources.find((r) => r.id === id);
  if (!resource) {
    throw new Error(`Resource with ID ${id} not found`);
  }
  return { ...resource };
};

export const getFeaturedResources = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const store = getStore();
  return store.knowledgeResources.filter((r) => r.featured);
};

export default {
  getResources,
  getResourceById,
  getFeaturedResources,
};
