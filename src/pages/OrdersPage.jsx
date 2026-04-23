import { useOrdersStore } from "../stores/useOrdersStore";
import "../styles/pages/orders.css";

const OrdersPage = () => {
  const orders = useOrdersStore((state) => state.orders);

  return (
    <main className="orders-page">
      <h2 className="orders-title">Your Orders</h2>
      {orders.length !== 0 ? (
        orders.map((order) => {
          return (
            <article className="order-card" key={order.ordernumber}>
              <div className="order-header">
                <div className="order-number">
                  <strong>Order:</strong> {order.ordernumber}
                </div>
                <div className="order-date">{order.orderdate}</div>
              </div>

              <div className="order-total">
                <strong>Total:</strong> {order.total} sek
              </div>

              <div className="order-products">
                <strong>Items:</strong>
                <ul>
                  {order.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <span>{item.title}</span>
                        <span className="order-products__quantity">
                          x{item.quantity}
                        </span>
                        <span className="order-products__price">
                          {Math.ceil(item.price)} kr
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          );
        })
      ) : (
        <p className="orders-empty">You have no orders.</p>
      )}
    </main>
  );
};

export default OrdersPage;
