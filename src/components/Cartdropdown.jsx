import { Link } from "react-router-dom";
import "../styles/components/cart.css";
import Cartitems from "./Cartitems";
import { useCartStore } from "../stores/useCartStore";

const Cartdropdown = ({ toggleCartdropdown }) => {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore((state) => state.getTotal());

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
          cart.map((item) => <Cartitems item={item} key={item.id} />)
        )}
      </div>
      <div className="cart-footer">
        <p className={cart.length === 0 ? "hidden" : "cart-total"}>
          {total} sek
        </p>
        <Link
          className={`cart-checkout-btn ${cart.length === 0 ? "cart-checkout-btn--disabled" : ""}`}
          to={cart.length === 0 ? "#" : "checkout"}
        >
          Checkout
        </Link>
        <button
          className={cart.length === 0 ? "hidden" : "cart-clear-btn"}
          onClick={() => {
            clearCart();
          }}
        >
          Clear cart
        </button>
      </div>
    </aside>
  );
};

export default Cartdropdown;
