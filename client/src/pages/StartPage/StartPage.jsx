import Hero from "../../components/Hero/Hero";
import Productgrid from "../../components/Productgrid/Productgrid";
import styles from "./StartPage.module.css";

const StartPage = () => {
  return (
    <div className={styles.startPage}>
      <Hero />
      <section className={styles.productsSection}>
        <h2 className={styles.productsTitle}>Collection</h2>
      </section>
      <Productgrid />
    </div>
  );
};

export default StartPage;
