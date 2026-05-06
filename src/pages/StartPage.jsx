import Hero from "../components/Hero";
import Productgrid from "../components/Productgrid";
import "../styles/pages/start.css";

const StartPage = () => {
  return (
    <div className="start-page">
      <Hero />
      <section className="products-section">
        <h2 className="products-title">Collection</h2>
      </section>
      <Productgrid />
    </div>
  );
};

export default StartPage;
