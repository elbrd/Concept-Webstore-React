import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Cartdropdown from "./components/Cartdropdown";
import { useCart } from "./hooks/useCart";

function Layout() {
  const {
    cart,
    addToCart,
    removeFromCart,
    subtotal,
    shipping,
    setShipping,
    total,
  } = useCart();

  const location = useLocation();

  useEffect(() => {
    toggleCartdropdown(false);
  }, [location.pathname]);

  // Toggle visibility cart dropdown
  const [cartdropdown, toggleCartdropdown] = useState(false);

  // Cart object
  const cartObj = {
    cart: cart,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    toggleCartdropdown: toggleCartdropdown,
    subtotal: subtotal,
    shipping: shipping,
    setShipping: setShipping,
    total: total,
  };

  return (
    <div className="app">
      <Header cartObj={cartObj} />
      {!cartdropdown ? "" : <Cartdropdown cartObj={cartObj} />}
      <Outlet context={{ cartObj }} />
      <Footer />
    </div>
  );
}

export default Layout;
