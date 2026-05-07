import { useCartStore } from "../../stores/useCartStore";
import styles from "./Cart.module.css";

const Cart = ({ toggleCartdropdown }) => {
  const cartCount = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <button
      className={styles.cartBtn}
      onClick={() => {
        toggleCartdropdown(true);
      }}
    >
      CART (<span className={styles.cartCount}>{cartCount}</span>)
    </button>
  );
};

export default Cart;
