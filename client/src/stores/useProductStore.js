import { create } from "zustand";
import { getProducts } from "../scripts/api/api";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });

    try {
      const products = await getProducts();
      set({ products });
    } catch (error) {
      console.error(error.message);
      set({ error: "Failed to recieve products..." });
    } finally {
      set({ loading: false });
    }
  },
}));
