import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";
import { API_URL } from "../utils/api";

const calculateSubtotal = (cart) => {
  return Math.ceil(
    cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0,
    ),
  );
};

export const useCartStore = create((set, get) => ({
  cart: {
    items: [],
  },
  shipping: 0,

  fetchCart: async () => {
    try {
      const token = useAuthStore.getState().token;
      if (!token) return;

      const response = await axios.get(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ cart: response.data.cart });
    } catch (error) {
      set({ cart: { items: [] } });
      console.log(error.response?.data?.message || error.message);
    }
  },

  addToCart: async (_id) => {
    try {
      const token = useAuthStore.getState().token;
      const setGuestToken = useAuthStore.getState().setGuestToken;

      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {};

      const response = await axios.post(
        `${API_URL}/cart/items`,
        {
          productId: _id,
          quantity: 1,
        },
        config,
      );

      if (!token) {
        setGuestToken(response.data.guestToken);
      }

      await get().fetchCart();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error.response?.data?.message || error.message);
    }
  },

  removeFromCart: async (_id) => {
    try {
      const token = useAuthStore.getState().token;
      const setGuestToken = useAuthStore.getState().setGuestToken;

      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {};

      const response = await axios.delete(
        `${API_URL}/cart/items/${_id}`,

        config,
      );

      if (!token) {
        setGuestToken(response.data.guestToken);
      }

      await get().fetchCart();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error.response?.data?.message || error.message);
    }
  },

  clearCart: async () => {
    try {
      const token = useAuthStore.getState().token;

      const response = await axios.patch(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ shipping: 0 });
      await get().fetchCart();
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  },

  deleteCart: async () => {
    try {
      const token = useAuthStore.getState().token;

      const response = await axios.delete(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ shipping: 0 });
      console.log(response.data.message);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  },

  getSubtotal: () => calculateSubtotal(get().cart),
  getTotal: () => calculateSubtotal(get().cart) + get().shipping,
  setShipping: (shipping) => set({ shipping }),
}));
