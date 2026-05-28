import { useState, useEffect } from "react";
import styles from "./Productgrid.module.css";
import { getProducts } from "../../scripts/api/api";
import Productcard from "../Productcard/Productcard";
import { useProductStore } from "../../stores/useProductStore";

const Productgrid = () => {
  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);

  return (
    <main className={styles.productGrid}>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {products &&
        products.map((product) => (
          <Productcard product={product} key={product.id} />
        ))}
    </main>
  );
};

export default Productgrid;

// const [products, setProducts] = useState([]);

// useEffect(() => {
//   async function fetchData() {
//     const data = await getProducts();
//     setProducts(data);
//   }

//   fetchData();
// }, []);
