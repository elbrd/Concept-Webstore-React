import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCartStore } from "../stores/useCartStore";

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
      className="product-card"
      onClick={() => {
        navigate(`/detail/${product.id}`);
      }}
    >
      <div className="product-card__image-container">
        <img
          className="product-card__image"
          src={product.thumbnail}
          alt={product.title}
        />
      </div>

      <div className="product-card__info">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__title">{product.title}</h3>

        <div className="product-card__footer">
          <span className="product-card__price">
            {Math.ceil(product.price)} sek
          </span>

          <button className="product-card__btn-add" onClick={handleAdd}>
            ADD
          </button>
        </div>
      </div>
    </article>
  );
};

export default Productcard;
