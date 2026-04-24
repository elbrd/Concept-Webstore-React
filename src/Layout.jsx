import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Cartdropdown from "./components/Cartdropdown";
import { useCart } from "./hooks/useCart";
import { useOrdersStore } from "./stores/useOrdersStore";
import toast, { Toaster } from "react-hot-toast";

function Layout() {
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    subtotal,
    shipping,
    setShipping,
    total,
  } = useCart();

  // Get orders from ls
  const setOrders = useOrdersStore((state) => state.setOrders);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders"));

    if (storedOrders) {
      setOrders(storedOrders);
    }
  }, []);

  // Toast
  const notify = () => toast.success("Product succesfully added to cart.");

  // Toggle visibility cart dropdown
  const location = useLocation();

  useEffect(() => {
    toggleCartdropdown(false);
  }, [location.pathname]);

  const [cartdropdown, toggleCartdropdown] = useState(false);

  // Cart object
  const cartObj = {
    cart: cart,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
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
      <Toaster />
      <Outlet context={{ cartObj, notify }} />
      <Footer />
    </div>
  );
}

export default Layout;
