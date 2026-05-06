import { useCartStore } from "../stores/useCartStore";

const Cart = ({ toggleCartdropdown }) => {
  const cartCount = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <button
      className="cart-btn"
      onClick={() => {
        toggleCartdropdown(true);
      }}
    >
      CART (<span className="cart-count">{cartCount}</span>)
    </button>
  );
};

export default Cart;
