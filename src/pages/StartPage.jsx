import Hero from "../components/Hero";
import Productgrid from "../components/Productgrid";

const StartPage = ({ addToCart, removeFromCart }) => {
  return (
    <div className="page">
      <Hero />
      <section className="products-section">
        <h2 className="products-title">Collection</h2>
      </section>
      <Productgrid addToCart={addToCart} removeFromCart={removeFromCart} />
    </div>
  );
};

export default StartPage;
