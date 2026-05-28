import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await axios.get("https://dummyjson.com/products");
      console.log(res.data.products);

      set({ products: res.data.products });
    } catch (error) {
      console.error(error.message);
      set({ error: "Failed to recieve products..." });
    } finally {
      set({ loading: false });
    }
  },
}));
