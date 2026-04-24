import { useState } from "react";

const Detailcard = ({ product, addToCart, notify }) => {
  const [description, toggleDescription] = useState(false);

  const handleAdd = (product) => {
    addToCart(product);
    notify();
  };

  return (
    <>
      <section className="product-gallery">
        <img
          className="product-image"
          src={product.thumbnail}
          alt={product.title}
        />
      </section>

      <section className="product-info">
        <h2 className="product-title">{product.title}</h2>

        <p className="product-category">{product.category}</p>

        {!description ? (
          product?.description && (
            <p className="product-description short">
              {product.description.slice(0, 120)}...
            </p>
          )
        ) : (
          <p className="product-description long">{product.description}</p>
        )}

        {!description ? (
          <button
            onClick={() => toggleDescription(true)}
            className="btn-read-more"
          >
            READ MORE
          </button>
        ) : (
          <button
            onClick={() => toggleDescription(false)}
            className="btn-read-more"
          >
            READ LESS
          </button>
        )}

        <div className="product-bottom">
          <span className="product-price">{Math.ceil(product.price)} sek</span>
          <button onClick={() => handleAdd(product)} className="btn-add">
            ADD TO CART
          </button>
        </div>
      </section>
    </>
  );
};

export default Detailcard;
