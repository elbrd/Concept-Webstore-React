import { useEffect, useState } from "react";

const Cart = ({ cart, toggleCartdropdown }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let total = 0;

    cart.forEach((item) => {
      total += item.quantity;
    });

    setCartCount(total);
  }, [cart]);

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
