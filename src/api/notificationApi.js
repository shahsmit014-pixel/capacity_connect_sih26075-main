import { getStore, updateStore } from "./mockData";

export const getNotifications = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const store = getStore();
  return [...store.notifications];
};

export const markAsRead = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 80));
  let updated;
  updateStore((store) => {
    store.notifications = store.notifications.map((n) =>
      n.id === id ? { ...n, unread: false } : n
    );
    updated = [...store.notifications];
    return store;
  });
  return updated;
};

export const markAllAsRead = async () => {
  await new Promise((resolve) => setTimeout(resolve, 80));
  let updated;
  updateStore((store) => {
    store.notifications = store.notifications.map((n) => ({ ...n, unread: false }));
    updated = [...store.notifications];
    return store;
  });
  return updated;
};

export default {
  getNotifications,
  markAsRead,
  markAllAsRead,
};
