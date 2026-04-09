import Cart from "./Cart";

const Header = ({ cartObj }) => {
  const { cart, toggleCartdropdown } = cartObj;

  return (
    <header className="header">
      <h1 className="logo">PLACEHOLDER</h1>
      <a className="orders-btn">ORDERS</a>
      <Cart cart={cart} toggleCartdropdown={toggleCartdropdown} />
    </header>
  );
};

export default Header;
