import "../styles/pages/thankyou.css";
import { useOrdersStore } from "../stores/useOrdersStore";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

const ThankyouPage = () => {
  const { ordernumber } = useParams();
  const orders = useOrdersStore((state) => state.orders);

  const order = orders.find((o) => o.ordernumber === ordernumber);

  return (
    <main className="thankyou-page">
      <section className="thankyou-card">
        <div className="thankyou-icon" aria-hidden="true">
          ✓
        </div>
        <h1 className="thankyou-title">
          Thank you — your order has been received
        </h1>
        <p className="thankyou-lead">
          We've received your order and sent a confirmation to your email.
        </p>

        <aside className="order-summary" aria-labelledby="summary-title">
          <h2 id="summary-title">Order summary</h2>

          <ul className="order-items">
            {order?.items.map((item) => {
              return (
                <li key={item.id} className="order-item">
                  <span className="item-name">{item.title}</span>
                  <span className="item-qty">x{item.quantity}</span>
                  <span className="item-price">
                    {Math.ceil(item.price * item.quantity)} kr
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="order-totals">
            <div className="order-line">
              <strong>Order number:</strong>{" "}
              <span id="order-number">{order?.ordernumber}</span>
            </div>
            <div className="order-line">
              <strong>Order date:</strong>{" "}
              <span id="order-date">{order?.orderdate}</span>
            </div>
            <div className="order-line">
              <strong>Total:</strong>{" "}
              <span id="order-total">{order?.total} kr</span>
            </div>
          </div>

          <Link to="/" className="btn-back">
            Back to homepage
          </Link>
        </aside>
      </section>
    </main>
  );
};

export default ThankyouPage;
