import React from "react";

const Checkoutitems = ({ item, addToCart, removeFromCart }) => {
  return (
    <article className="checkout-item">
      <div className="checkout-item__image">
        <img src={item.image} alt="Product" />
      </div>

      <div className="checkout-item__details">
        <h3 className="checkout-item__title">{item.title}</h3>
        <p className="checkout-item__price">{Math.ceil(item.price)} sek</p>
      </div>

      <div className="checkout-item__quantity">
        <span>{item.quantity}x</span>

        <div>
          <button
            className="plus-minus-btn"
            onClick={() => removeFromCart(item)}
          >
            <i className="fa-solid fa-minus"></i>
          </button>

          <button className="plus-minus-btn" onClick={() => addToCart(item)}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <div className="checkout-item__subtotal">
        <p>{Math.ceil(item.price) * item.quantity} sek</p>
      </div>
    </article>
  );
};

export default Checkoutitems;
