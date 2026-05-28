import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h2>Welcome to Our Store</h2>
        <p>Discover our amazing collection of products</p>
      </div>
    </section>
  );
};

export default Hero;
