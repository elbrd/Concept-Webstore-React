import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./Detailcard.module.css";
import { useCartStore } from "../../stores/useCartStore";

const Detailcard = ({ product }) => {
  const [description, toggleDescription] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <>
      <section className={styles.productGallery}>
        <img
          className={styles.productImage}
          src={product.thumbnail}
          alt={product.title}
        />
      </section>

      <section className={styles.productInfo}>
        <h2 className={styles.productTitle}>{product.title}</h2>

        <p className={styles.productCategory}>{product.category}</p>

        {!description ? (
          product?.description && (
            <p
              className={`${styles.productDescription} ${styles.productDescriptionShort}`}
            >
              {product.description.slice(0, 120)}...
            </p>
          )
        ) : (
          <p
            className={`${styles.productDescription} ${styles.productDescriptionLong}`}
          >
            {product.description}
          </p>
        )}

        {!description ? (
          <button
            onClick={() => toggleDescription(true)}
            className={styles.btnReadMore}
          >
            READ MORE
          </button>
        ) : (
          <button
            onClick={() => toggleDescription(false)}
            className={styles.btnReadMore}
          >
            READ LESS
          </button>
        )}

        <div className={styles.productBottom}>
          <span className={styles.productPrice}>
            {Math.ceil(product.price)} sek
          </span>
          <button
            onClick={() => addToCart(product._id)}
            className={styles.btnAdd}
          >
            ADD TO CART
          </button>
        </div>
      </section>
    </>
  );
};

export default Detailcard;
