import styles from "./ThankyouPage.module.css";
import { useOrdersStore } from "../../stores/useOrdersStore";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

const ThankyouPage = () => {
  const { orderId } = useParams();

  const orders = useOrdersStore((state) => state.orders);
  const order = orders.find((o) => o._id === orderId);

  return (
    <main className={styles.thankyouPage}>
      <section className={styles.thankyouCard}>
        <div className={styles.thankyouIcon} aria-hidden="true">
          ✓
        </div>
        <h1 className={styles.thankyouTitle}>
          Thank you — your order has been received
        </h1>
        <p className={styles.thankyouLead}>
          We've received your order and sent a confirmation to your email.
        </p>

        <aside className={styles.orderSummary} aria-labelledby="summary-title">
          <h2 id="summary-title">Order summary</h2>

          <ul className={styles.orderItems}>
            {order?.items.map((item) => {
              return (
                <li key={item.productId} className={styles.orderItem}>
                  <span className={styles.itemName}>{item.title}</span>
                  <span className={styles.itemQty}>x{item.quantity}</span>
                  <span className={styles.itemPrice}>
                    {Math.ceil(item.price * item.quantity)} kr
                  </span>
                </li>
              );
            })}
          </ul>

          <div className={styles.orderTotals}>
            <div className={styles.orderLine}>
              <strong>Order:</strong>{" "}
              <span id="order-number">{order?._id}</span>
            </div>
            <div className={styles.orderLine}>
              <strong>Order date:</strong>{" "}
              <span id="order-date">{order?.orderDate}</span>
            </div>
            <div className={styles.orderLine}>
              <strong>Total:</strong>{" "}
              <span id="order-total">{order?.total} kr</span>
            </div>
          </div>

          <Link to="/" className={styles.backButton}>
            Back to homepage
          </Link>
        </aside>
      </section>
    </main>
  );
};

export default ThankyouPage;
