import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token:
    sessionStorage.getItem("token") || sessionStorage.getItem("guestToken"),

  loginUser: (token) => {
    sessionStorage.removeItem("guestToken");
    sessionStorage.setItem("token", token);

    set({
      token,
    });
  },

  logoutUser: () => {
    sessionStorage.removeItem("token");

    set({
      token: null,
    });
  },

  setGuestToken: (token) => {
    sessionStorage.setItem("guestToken", token);

    set({
      token,
    });
  },
}));
