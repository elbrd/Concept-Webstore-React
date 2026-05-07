import { useState, useEffect } from "react";
import styles from "./Productgrid.module.css";
import { getProducts } from "../../scripts/api/api";
import Productcard from "../Productcard/Productcard";

const Productgrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
    }

    fetchData();
  }, []);

  return (
    <main className={styles.productGrid}>
      {products.map((product) => (
        <Productcard product={product} key={product.id} />
      ))}
    </main>
  );
};

export default Productgrid;
