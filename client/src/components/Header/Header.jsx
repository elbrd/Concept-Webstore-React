import styles from "./Header.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Cart from "../Cart/Cart";
import { useCartStore } from "../../stores/useCartStore";
import { useAuthStore } from "../../stores/useAuthStore";

const Header = ({ toggleCartdropdown }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const cart = useCartStore((state) => state.cart);
  const loggedInUser = !!sessionStorage.getItem("token");
  const logoutUser = useAuthStore((state) => state.logoutUser);

  const logOutHandler = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <h1 onClick={() => navigate("/")} className={styles.logo}>
        CONCEPT WEBSTORE
      </h1>
      <div className={styles.headerBox}>
        {loggedInUser ? (
          <a onClick={logOutHandler} className={styles.headerBtn}>
            LOGOUT
          </a>
        ) : (
          <a onClick={() => navigate("/login")} className={styles.headerBtn}>
            LOGIN
          </a>
        )}

        {loggedInUser ? (
          <a onClick={() => navigate("/orders")} className={styles.headerBtn}>
            ORDERS
          </a>
        ) : (
          ""
        )}

        {location.pathname !== "/checkout" ? (
          <Cart cart={cart} toggleCartdropdown={toggleCartdropdown} />
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Header;
