import Cart from "./Cart";

const Header = ({ toggleCartdropdown }) => {
  return (
    <header className="header">
      <h1 className="logo">PLACEHOLDER</h1>
      <a className="orders-btn">ORDERS</a>
      <Cart toggleCartdropdown={toggleCartdropdown} />
    </header>
  );
};

export default Header;
