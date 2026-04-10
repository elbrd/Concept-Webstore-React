import { useNavigate } from "react-router-dom";
import Cart from "./Cart";

const Header = ({ cartObj }) => {
  const { cart, toggleCartdropdown } = cartObj;

  const navigate = useNavigate();

  return (
    <header className="header">
      <h1 onClick={() => navigate("/")} className="logo">
        PLACEHOLDER
      </h1>
      <a className="orders-btn">ORDERS</a>
      <Cart cart={cart} toggleCartdropdown={toggleCartdropdown} />
    </header>
  );
};

export default Header;
