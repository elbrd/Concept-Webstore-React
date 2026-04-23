import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import "../styles/components/navbar.css";

const Header = ({ cartObj }) => {
  const { cart, toggleCartdropdown } = cartObj;

  const navigate = useNavigate();

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
