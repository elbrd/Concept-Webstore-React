import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/HeaderNew/Header";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import Cartdropdown from "./components/Cartdropdown/Cartdropdown";
import { Toaster } from "react-hot-toast";

function Layout() {
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
