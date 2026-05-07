import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./Productcard.module.css";
import { useCartStore } from "../../stores/useCartStore";

const Productcard = ({ product }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success("Product successfully added to cart.");
  };

  return (
    <article
      className={styles.productCard}
      onClick={() => {
        navigate(`/detail/${product.id}`);
      }}
    >
      <div className={styles.productCardImageContainer}>
        <img
          className={styles.productCardImage}
          src={product.thumbnail}
          alt={product.title}
        />
      </div>

      <div className={styles.productCardInfo}>
        <p className={styles.productCardCategory}>{product.category}</p>
        <h3 className={styles.productCardTitle}>{product.title}</h3>

        <div className={styles.productCardFooter}>
          <span className={styles.productCardPrice}>
            {Math.ceil(product.price)} sek
          </span>

          <button className={styles.productCardBtnAdd} onClick={handleAdd}>
            ADD
          </button>
        </div>
      </div>
    </article>
  );
};

export default Productcard;
