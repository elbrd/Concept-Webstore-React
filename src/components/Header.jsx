import { useLocation, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import "../styles/components/navbar.css";
import { useCartStore } from "../stores/useCartStore";

const Header = ({ toggleCartdropdown }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useCartStore((state) => state.cart);

  return (
    <header className="header">
      <h1 onClick={() => navigate("/")} className="logo">
        PLACEHOLDER
      </h1>
      <a onClick={() => navigate("/orders")} className="orders-btn">
        ORDERS
      </a>
      {location.pathname !== "/checkout" ? (
        <Cart cart={cart} toggleCartdropdown={toggleCartdropdown} />
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;
