import { create } from "zustand";

const getStoredCart = () => {
  const stored = localStorage.getItem("cart");
  if (stored) {
    return JSON.parse(stored);
  } else {
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
