import Cart from "./Cart";

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">PLACEHOLDER</h1>
      <a href="orders.html" className="orders-btn">
        ORDERS
      </a>
      <Cart />
    </header>
  );
};

export default Header;
