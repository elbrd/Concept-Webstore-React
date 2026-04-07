import { useNavigate } from "react-router-dom";

const Productcard = ({ product, addToCart, removeFromCart }) => {
  const navigate = useNavigate();

  const handleAdd = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleRemove = (e, product) => {
    e.stopPropagation();
    removeFromCart(product);
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
          src={product.image}
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
          <button
            className="product-card__btn-add"
            onClick={(e) => {
              handleRemove(e, product);
            }}
          >
            REMOVE
          </button>
          <button
            className="product-card__btn-add"
            onClick={(e) => {
              handleAdd(e, product);
            }}
          >
            ADD
          </button>
        </div>
      </div>
    </article>
  );
};

export default Productcard;
