import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Detailcard from "../../components/Detailcard/Detailcard";
import { getProduct } from "../../scripts/api/api";
import styles from "./DetailPage.module.css";
import { useProductStore } from "../../stores/useProductStore";

const DetailPage = () => {
  const { id } = useParams();

  const products = useProductStore((state) => state.products);
  const product = products.find((p) => p.id === Number(id));

  return (
    <main className={styles.productPage}>
      <Detailcard product={product} />
    </main>
  );
};

export default DetailPage;

// const [product, setProduct] = useState([]);

// useEffect(() => {
//   async function fetchData(id) {
//     const data = await getProduct(id);
//     setProduct(data);
//   }

//   fetchData(id);
// }, [id]);
