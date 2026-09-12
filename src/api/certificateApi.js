import { getStore } from "./mockData";

export const getCertificates = async () => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const store = getStore();
  return [...store.certificates];
};

export const getCertificateById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const store = getStore();
  return store.certificates.find((c) => c.id === id) || null;
};

export default {
  getCertificates,
  getCertificateById,
};
