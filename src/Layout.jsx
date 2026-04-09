import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useState } from "react";
import Cartdropdown from "./components/Cartdropdown";

function Layout() {
  const [cart, setCart] = useState([]);

  // Add to cart
  function addToCart(item) {
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
  }

  // Remove from cart
  function removeFromCart(item) {
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
  }

  // Toggle visibility cart dropdown
  const [cartdropdown, toggleCartdropdown] = useState(false);

  // Cart object
  const cartObj = {
    cart: cart,
    setCart: setCart,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    toggleCartdropdown: toggleCartdropdown,
  };

  return (
    <div className="app">
      <Header cartObj={cartObj} />
      {!cartdropdown ? "" : <Cartdropdown cartObj={cartObj} />}
      <Outlet context={{ addToCart, removeFromCart }} />
      <Footer />
    </div>
  );
}

export default Layout;
