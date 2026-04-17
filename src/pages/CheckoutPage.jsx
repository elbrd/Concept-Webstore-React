import { useOutletContext } from "react-router-dom";
import Checkoutitems from "../components/Checkoutitems";
import "../styles/pages/checkout.css";
import { useEffect, useState } from "react";

const CheckoutPage = () => {
  const { cartObj } = useOutletContext();

  return (
    <div className="checkout">
      <section className="checkout-container">
        <h2 className="checkout-title">Order Summary</h2>

        <p className="checkout-items__empty hidden">Your cart is empty.</p>

        <div className="checkout-items">
          {cartObj.cart.map((item) => {
            return (
              <Checkoutitems
                item={item}
                key={item.id}
                addToCart={cartObj.addToCart}
                removeFromCart={cartObj.removeFromCart}
              />
            );
          })}
        </div>

        <div className="checkout-summary">
          <div className="checkout-summary__row">
            <span>Subtotal</span>
            <span>{cartObj.subtotal} sek</span>
          </div>

          <div className="checkout-summary__row">
            <span>Shipping</span>
            <select
              className="shipping-select"
              onChange={(e) => cartObj.setShipping(Number(e.target.value))}
            >
              <option value="" disabled defaultValue={0}>
                Select option
              </option>
              <option value="0">Standard - 0 sek</option>
              <option value="50">Express - 50 sek</option>
            </select>
          </div>

          <div className="checkout-summary__row checkout-summary__total">
            <span>Total</span>
            <span>{cartObj.total} sek</span>
          </div>
        </div>

        <button className="checkout-btn">Complete Order</button>
        <a href="index.html" className="checkout-back">
          Continue Shopping
        </a>
      </section>
    </div>
  );
};

export default CheckoutPage;
