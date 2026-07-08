import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

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

      const response = await axios.get("http://localhost:8083/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.cart);
      set({ cart: response.data.cart });
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  },

  addToCart: async (id_) => {
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
        "http://localhost:8083/api/cart/items",
        {
          productId: id_,
          quantity: 1,
        },
        config,
      );

      if (!token) {
        setGuestToken(response.data.guestToken);
      }

      await get().fetchCart();
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  },

  getSubtotal: () => calculateSubtotal(get().cart),
  getTotal: () => calculateSubtotal(get().cart) + get().shipping,

  clearCart: async () => {
    try {
      const token = useAuthStore.getState().token;

      const response = await axios.delete("http://localhost:8083/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await get().fetchCart();
      console.log(response.data.message);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  },

  setShipping: (shipping) => set({ shipping }),
}));

/*
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
*/

/*
const persistCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
*/

/*
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
  */
