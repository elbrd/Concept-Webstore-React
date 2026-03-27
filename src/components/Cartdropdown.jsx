const Cartdropdown = () => {
  return (
    <aside className="cart-dropdown hidden">
      <h3>Cart</h3>
      <i className="fa-solid fa-xmark cart-btn-close"></i>
      <p className="empty-cart">Your cart is empty.</p>
      <div className="cart-items"></div>
      <div className="cart-footer">
        <p className="cart-total"></p>
        <a href="checkout.html" className="cart-checkout-btn">
          Checkout
        </a>
      </div>
    </aside>
  );
};

export default Cartdropdown;
