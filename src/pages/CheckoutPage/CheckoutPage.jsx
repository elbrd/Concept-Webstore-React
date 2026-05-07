import { Link } from "react-router-dom";
import Checkoutitems from "../../components/Checkoutitems/Checkoutitems";
import styles from "./CheckoutPage.module.css";
import { useOrdersStore } from "../../stores/useOrdersStore";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../stores/useCartStore";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const { createOrder } = useOrdersStore();

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const shipping = useCartStore((state) => state.shipping);
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
    <div className={styles.checkout}>
      <section className={styles.checkoutContainer}>
        <h2 className={styles.checkoutTitle}>Order Summary</h2>

        <div className={styles.checkoutItems}>
          {cart.map((item) => (
            <Checkoutitems item={item} key={item.id} />
          ))}
        </div>

        <div className={styles.checkoutSummary}>
          <div className={styles.checkoutSummaryRow}>
            <span>Subtotal</span>
            <span>{subtotal} sek</span>
          </div>

          <div className={styles.checkoutSummaryRow}>
            <span>Shipping</span>
            <select
              className={styles.shippingSelect}
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

          <div
            className={`${styles.checkoutSummaryRow} ${styles.checkoutSummaryTotal}`}
          >
            <span>Total</span>
            <span>{total} sek</span>
          </div>
        </div>

        <button
          className={`${styles.checkoutBtn} ${cart.length === 0 ? styles.checkoutBtnDisabled : ""}`}
          onClick={completeOrderHandler}
        >
          Complete Order
        </button>
        <Link to="/" className={styles.checkoutBack}>
          Continue Shopping
        </Link>
      </section>
    </div>
  );
};

export default CheckoutPage;
