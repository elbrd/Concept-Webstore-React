import { useOrdersStore } from "../../stores/useOrdersStore";
import styles from "./OrdersPage.module.css";

const OrdersPage = () => {
  const orders = useOrdersStore((state) => state.orders);

  return (
    <main className={styles.ordersPage}>
      <h2 className={styles.ordersTitle}>Your Orders</h2>
      {orders.length !== 0 ? (
        orders.map((order) => {
          return (
            <article className={styles.orderCard} key={order.ordernumber}>
              <div className={styles.orderHeader}>
                <div className={styles.orderNumber}>
                  <strong>Order:</strong> {order.ordernumber}
                </div>
                <div className={styles.orderDate}>{order.orderdate}</div>
              </div>

              <div className={styles.orderTotal}>
                <strong>Total:</strong> {order.total} sek
              </div>

              <div className={styles.orderProducts}>
                <strong>Items:</strong>
                <ul>
                  {order.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <span>{item.title}</span>
                        <span className={styles.orderProductsQuantity}>
                          x{item.quantity}
                        </span>
                        <span className={styles.orderProductsPrice}>
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
        <p className={styles.ordersEmpty}>You have no orders.</p>
      )}
    </main>
  );
};

export default OrdersPage;
