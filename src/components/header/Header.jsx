import styles from "./Header.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Cart from "../Cart";
import { useCartStore } from "../../stores/useCartStore";

const Header = ({ toggleCartdropdown }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useCartStore((state) => state.cart);

  return (
    <header className={styles.header}>
      <h1 onClick={() => navigate("/")} className={styles.logo}>
        PLACEHOLDER
      </h1>
      <a onClick={() => navigate("/orders")} className={styles.ordersBtn}>
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
