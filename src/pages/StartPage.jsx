import { useOutletContext } from "react-router-dom";
import Hero from "../components/Hero";
import Productgrid from "../components/Productgrid";

const StartPage = () => {
  const { cartObj } = useOutletContext();
  return (
    <div className="page">
      <Hero />
      <section className="products-section">
        <h2 className="products-title">Collection</h2>
      </section>
      <Productgrid
        addToCart={cartObj.addToCart}
        removeFromCart={cartObj.removeFromCart}
      />
    </div>
  );
};

export default StartPage;
