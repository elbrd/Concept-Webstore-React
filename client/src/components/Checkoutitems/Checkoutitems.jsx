import React from "react";
import styles from "./Checkoutitems.module.css";
import { useCartStore } from "../../stores/useCartStore";

const Checkoutitems = ({ item }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <article className={styles.checkoutItem}>
      <div className={styles.checkoutItemImage}>
        <img src={item.productId.thumbnail} alt="Product" />
      </div>

      <div className={styles.checkoutItemDetails}>
        <h3 className={styles.checkoutItemTitle}>{item.productId.title}</h3>
        <p className={styles.checkoutItemPrice}>
          {Math.ceil(item.productId.price)} sek
        </p>
      </div>

      <div className={styles.checkoutItemQuantity}>
        <span>{item.quantity}x</span>

        <div>
          <button
            className={styles.plusMinusBtn}
            onClick={() => removeFromCart(item.productId._id)}
          >
            <i className="fa-solid fa-minus"></i>
          </button>

          <button
            className={styles.plusMinusBtn}
            onClick={() => addToCart(item.productId._id)}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <div className={styles.checkoutItemSubtotal}>
        <p>{Math.ceil(item.productId.price) * item.quantity} sek</p>
      </div>
    </article>
  );
};

export default Checkoutitems;
