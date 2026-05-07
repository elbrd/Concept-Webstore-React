import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/header/Header.jsx";
import { useEffect, useState } from "react";
import Cartdropdown from "./components/Cartdropdown/Cartdropdown";
import { useOrdersStore } from "./stores/useOrdersStore";
import { Toaster } from "react-hot-toast";

function Layout() {
  // Get orders from ls
  const setOrders = useOrdersStore((state) => state.setOrders);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders"));

    if (storedOrders) {
      setOrders(storedOrders);
    }
  }, []);

  // Toggle visibility cart dropdown
  const location = useLocation();

  useEffect(() => {
    toggleCartdropdown(false);
  }, [location.pathname]);

  const [cartdropdown, toggleCartdropdown] = useState(false);

  return (
    <div className="app">
      <Header toggleCartdropdown={toggleCartdropdown} />
      {!cartdropdown ? (
        ""
      ) : (
        <Cartdropdown toggleCartdropdown={toggleCartdropdown} />
      )}
      <Toaster />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
