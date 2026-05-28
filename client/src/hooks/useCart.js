import { useState, useEffect } from "react";

export const useCart = () => {
  // Get cart from ls
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // Save cart in ls
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (item) => {
    const existingProduct = cart.find((i) => i.id === item.id);

    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((i) => {
          if (i.id === item.id) {
            return {
              ...i,
              quantity: i.quantity + 1,
            };
          }
          return i;
        }),
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          id: item.id,
          image: item.thumbnail,
          title: item.title,
          price: item.price,
          quantity: 1,
        },
      ]);
    }
  };

  // Remove from cart
  const removeFromCart = (item) => {
    const existingProduct = cart.find((i) => i.id === item.id);

    if (!existingProduct) return;

    if (existingProduct.quantity > 1) {
      setCart((prevCart) =>
        prevCart.map((i) => {
          if (i.id === item.id) {
            return {
              ...i,
              quantity: i.quantity - 1,
            };
          }
          return i;
        }),
      );
    } else {
      setCart((prevCart) => prevCart.filter((i) => i.id !== item.id));
    }
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate cart
  const [subtotal, setSubtotal] = useState(null);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(null);

  const calculateSubtotal = (cart) => {
    let currentSubtotal = 0;

    cart.forEach((item) => {
      currentSubtotal = Math.ceil(currentSubtotal + item.price * item.quantity);
    });

    setSubtotal(currentSubtotal);
  };

  useEffect(() => {
    setTotal(subtotal + shipping);
  }, [subtotal, shipping]);

  useEffect(() => {
    calculateSubtotal(cart);
  }, [cart]);

  return {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    clearCart,
    subtotal,
    shipping,
    setShipping,
    total,
  };
};
