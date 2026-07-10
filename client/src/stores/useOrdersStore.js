import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { useCartStore } from "./useCartStore";
import axios from "axios";
import { API_URL } from "../utils/api";

export const useOrdersStore = create((set, get) => ({
  orders: [],

  fetchOrders: async () => {
    try {
      const token = useAuthStore.getState().token;

      const response = await axios.get(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ orders: response.data.orders });
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  },

  createOrder: async (shipping) => {
    try {
      const token = useAuthStore.getState().token;
      const fetchCart = useCartStore.getState().fetchCart;
      const removeGuestToken = useAuthStore.getState().removeGuestToken;

      const response = await axios.post(
        `${API_URL}/orders`,
        {
          shipping,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await get().fetchOrders();
      await fetchCart();
      removeGuestToken();
      return response.data.order._id;
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  },
}));
