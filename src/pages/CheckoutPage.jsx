import { Link } from "react-router-dom";
import Checkoutitems from "../components/Checkoutitems";
import "../styles/pages/checkout.css";
import { useOrdersStore } from "../stores/useOrdersStore";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { createOrder } = useOrdersStore();
  const cart = useCartStore((state) => state.cart);
  const shipping = useCartStore((state) => state.shipping);
  const clearCart = useCartStore((state) => state.clearCart);
  const setShipping = useCartStore((state) => state.setShipping);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const total = useCartStore((state) => state.getTotal());

  const completeOrderHandler = () => {
    if (cart.length === 0) return;

    const orderNumber = Date.now().toString().slice(-6);

    createOrder(cart, subtotal, shipping, total, orderNumber);
    clearCart();
    navigate(`/thankyou/${orderNumber}`);
  };

  return (
    <div className="checkout">
      <section className="checkout-container">
        <h2 className="checkout-title">Order Summary</h2>

        <div className="checkout-items">
          {cart.map((item) => (
            <Checkoutitems item={item} key={item.id} />
          ))}
        </div>

        <div className="checkout-summary">
          <div className="checkout-summary__row">
            <span>Subtotal</span>
            <span>{subtotal} sek</span>
          </div>

          <div className="checkout-summary__row">
            <span>Shipping</span>
            <select
              className="shipping-select"
              onChange={(e) => setShipping(Number(e.target.value))}
              value={shipping}
            >
              <option value="" disabled>
                Select option
              </option>
              <option value="0">Standard - 0 sek</option>
              <option value="50">Express - 50 sek</option>
            </select>
          </div>

          <div className="checkout-summary__row checkout-summary__total">
            <span>Total</span>
            <span>{total} sek</span>
          </div>
        </div>

        <button
          className={`checkout-btn ${cart.length === 0 ? "checkout-btn--disabled" : ""}`}
          onClick={completeOrderHandler}
        >
          Complete Order
        </button>
        <Link to="/" className="checkout-back">
          Continue Shopping
        </Link>
      </section>
    </div>
  );
};

export default CheckoutPage;
