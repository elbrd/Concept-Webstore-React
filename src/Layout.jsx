import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useState } from "react";
import Cartdropdown from "./components/Cartdropdown";
import { useCart } from "./hooks/useCart";

function Layout() {
  const { cart, setCart, addToCart, removeFromCart } = useCart();

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
