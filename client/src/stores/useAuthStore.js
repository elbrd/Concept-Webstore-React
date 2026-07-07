import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: sessionStorage.getItem("token"),

  loginUser: (token) => {
    sessionStorage.setItem("token", token);
  },

  logoutUser: () => {
    sessionStorage.setItem("token", null);
  },
}));

/*
users: getUsers(),

registerUser: (user) => {
  let updated;
  set((state) => {
    updated = [...state.users, user];
    return { users: updated };
  });
  
  persistUsers(updated);
},

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
*/
