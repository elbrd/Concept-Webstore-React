import { useState } from "react";
import toast from "react-hot-toast";
import { useCartStore } from "../stores/useCartStore";

const Detailcard = ({ product }) => {
  const [description, toggleDescription] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = (product) => {
    addToCart(product);
    toast.success("Product successfully added to cart.");
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
