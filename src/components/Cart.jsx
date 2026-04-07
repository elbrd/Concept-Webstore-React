const Cart = ({ toggleCartdropdown }) => {
  return (
    <button
      className="cart-btn"
      onClick={() => {
        toggleCartdropdown(true);
      }}
    >
      CART (<span className="cart-count">0</span>)
    </button>
  );
};

export default Cart;
