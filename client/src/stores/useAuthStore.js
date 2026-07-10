import { create } from "zustand";
import { useCartStore } from "./useCartStore";

export const useAuthStore = create((set) => ({
  token:
    sessionStorage.getItem("token") || sessionStorage.getItem("guestToken"),

  loginUser: async (token) => {
    const guestUser = !!sessionStorage.getItem("guestToken");
    if (guestUser) {
      const deleteCart = useCartStore.getState().deleteCart;
      await deleteCart();
    }

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

  removeGuestToken: () => {
    const guestUser = !!sessionStorage.getItem("guestToken");
    if (!guestUser) return;

    sessionStorage.removeItem("guestToken");

    set({
      token: null,
    });
  },
}));
