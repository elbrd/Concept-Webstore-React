import { create } from "zustand";
import axios from "axios";

const getStoredCart = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get("http://localhost:8083/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.cart);
    return response.data.cart;
  } catch (error) {
    console.log(error.response.data.message);
    return [];
  }
};

const persistCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const calculateSubtotal = (cart) => {
  return Math.ceil(
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );
};

export const useCartStore = create((set, get) => ({
  cart: getStoredCart(),
  shipping: 0,

  getSubtotal: () => calculateSubtotal(get().cart),
  getTotal: () => calculateSubtotal(get().cart) + get().shipping,

  addToCart: (item) =>
    set((state) => {
      const existingProduct = state.cart.find(
        (product) => product.id === item.id,
      );

      let nextCart;
      if (existingProduct) {
        nextCart = state.cart.map((product) => {
          let updatedProduct;
          if (product.id === item.id) {
            updatedProduct = { ...product, quantity: product.quantity + 1 };
          } else {
            updatedProduct = product;
          }
          return updatedProduct;
        });
      } else {
        nextCart = [
          ...state.cart,
          {
            id: item.id,
            image: item.thumbnail,
            title: item.title,
            price: item.price,
            quantity: 1,
          },
        ];
      }

      persistCart(nextCart);
      return { cart: nextCart };
    }),

  removeFromCart: (item) =>
    set((state) => {
      const existingProduct = state.cart.find(
        (product) => product.id === item.id,
      );
      if (!existingProduct) return {};

      let nextCart;
      if (existingProduct.quantity > 1) {
        nextCart = state.cart.map((product) => {
          let updatedProduct;
          if (product.id === item.id) {
            updatedProduct = { ...product, quantity: product.quantity - 1 };
          } else {
            updatedProduct = product;
          }
          return updatedProduct;
        });
      } else {
        nextCart = state.cart.filter((product) => product.id !== item.id);
      }

      persistCart(nextCart);
      return { cart: nextCart };
    }),

  clearCart: () => {
    localStorage.removeItem("cart");

    return set({ cart: [] });
  },

  setShipping: (shipping) => set({ shipping }),
}));
