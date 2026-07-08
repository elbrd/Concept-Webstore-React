import { Link } from "react-router-dom";
import styles from "./Cartdropdown.module.css";
import Cartitems from "../Cartitems/Cartitems";
import { useCartStore } from "../../stores/useCartStore";

const Cartdropdown = ({ toggleCartdropdown }) => {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore((state) => state.getTotal());

  return (
    <aside className={styles.cartDropdown}>
      <h3>Cart</h3>
      <i
        className={`fa-solid fa-xmark ${styles.cartBtnClose}`}
        onClick={() => {
          toggleCartdropdown(false);
        }}
      ></i>
      <div className={styles.cartItems}>
        {cart.length === 0 ? (
          <p className={styles.emptyCart}>Your cart is empty.</p>
        ) : (
          cart.items.map((item) => (
            <Cartitems item={item} key={item.productId.id} />
          ))
        )}
      </div>
      <div className={styles.cartFooter}>
        <p className={cart.length === 0 ? styles.hidden : styles.cartTotal}>
          {total} sek
        </p>
        <Link
          className={`${styles.cartCheckoutBtn} ${cart.length === 0 ? styles.cartCheckoutBtnDisabled : ""}`}
          to={cart.length === 0 ? "#" : "checkout"}
        >
          Checkout
        </Link>
        <button
          className={cart.length === 0 ? styles.hidden : styles.cartClearBtn}
          onClick={() => {
            clearCart();
          }}
        >
          Clear cart
        </button>
      </div>
    </aside>
  );
};

export default Cartdropdown;
