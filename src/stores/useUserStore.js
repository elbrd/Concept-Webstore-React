import { create } from "zustand";

const getUsers = () => {
  const stored = localStorage.getItem("users");
  if (stored) {
    return JSON.parse(stored);
  } else {
    return [];
  }
};

const persistUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const useUserStore = create((set, get) => ({
  activeUser: null,
  users: getUsers(),

  registerUser: (user) => {
    let updated;
    set((state) => {
      updated = [...state.users, user];
      return { users: updated };
    });

    persistUsers(updated);
  },

  loginUser: (user) => {
    set({
      activeUser: user,
    });
  },

  logoutUser: () => {
    set({
      activeUser: null,
    });
  },
}));
