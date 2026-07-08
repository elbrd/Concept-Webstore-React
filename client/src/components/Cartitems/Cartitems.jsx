import styles from "./Cartitems.module.css";
import { useCartStore } from "../../stores/useCartStore";

const Cartitems = ({ item }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <article className={styles.cartCard}>
      <section>
        <img
          src={item.productId.thumbnail}
          alt=""
          className={styles.cartCardImage}
        />
      </section>

      <section>
        <h3 className={styles.cartCardTitle}>{item.productId.title}</h3>
        <p className={styles.cartCardPrice}>
          {Math.ceil(item.productId.price)} sek
        </p>

        <div>
          <button
            className={styles.plusMinusBtn}
            onClick={() => removeFromCart(item)}
          >
            <i className="fa-solid fa-minus"></i>
          </button>

          <button
            className={styles.plusMinusBtn}
            onClick={() => addToCart(item)}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        <p className={styles.cartCardAmount}>x{item.quantity}</p>
      </section>
    </article>
  );
};

export default Cartitems;
