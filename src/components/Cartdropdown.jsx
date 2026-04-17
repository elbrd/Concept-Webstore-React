import { Link, useNavigate } from "react-router-dom";
import "../styles/components/cart.css";
import Cartitems from "./Cartitems";

const Cartdropdown = ({ cartObj }) => {
  const { cart, addToCart, removeFromCart, toggleCartdropdown, total } =
    cartObj;

  return (
    <aside className="cart-dropdown">
      <h3>Cart</h3>
      <i
        className="fa-solid fa-xmark cart-btn-close"
        onClick={() => {
          toggleCartdropdown(false);
        }}
      ></i>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cart.map((item) => {
            return (
              <Cartitems
                item={item}
                key={item.id}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            );
          })
        )}
      </div>
      <div className="cart-footer">
        <p className={cart.length === 0 ? "hidden" : "cart-total"}>
          {cartObj.total} sek
        </p>
        <Link
          className={`cart-checkout-btn ${cart.length === 0 ? "cart-checkout-btn--disabled" : ""}`}
          to={cart.length === 0 ? "#" : "checkout"}
        >
          Checkout
        </Link>
      </div>
    </aside>
  );
};

export default Cartdropdown;
