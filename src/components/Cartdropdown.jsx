import "../styles/components/cart.css";
import Cartitems from "./Cartitems";

const Cartdropdown = ({
  toggleCartdropdown,
  cart,
  addToCart,
  removeFromCart,
}) => {
  return (
    <aside className="cart-dropdown">
      <h3>Cart</h3>
      <i
        className="fa-solid fa-xmark cart-btn-close"
        onClick={() => {
          toggleCartdropdown(false);
        }}
      ></i>
      <p className="empty-cart hidden">Your cart is empty.</p>
      <div className="cart-items">
        {cart.map((item) => {
          return (
            <Cartitems
              item={item}
              key={item.id}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          );
        })}
      </div>
      <div className="cart-footer">
        <p className="cart-total"></p>
        <a className="cart-checkout-btn">Checkout</a>
      </div>
    </aside>
  );
};

export default Cartdropdown;
