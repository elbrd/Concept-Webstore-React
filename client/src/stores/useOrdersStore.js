import { create } from "zustand";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./useAuthStore";
import axios from "axios";

export const useOrdersStore = create((set, get) => ({
  orders: [],

  fetchOrders: async () => {
    try {
      const token = useAuthStore.getState().token;

      const response = await axios.get("http://localhost:8083/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ orders: response.data.orders });
      console.log(response.data.orders);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  },

  createOrder: async (shipping) => {
    try {
      const token = useAuthStore.getState().token;

      const response = await axios.post(
        "http://localhost:8083/api/orders",
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
      return response.data.order._id;
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  },
}));
