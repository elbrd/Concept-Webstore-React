import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Detailcard from "../../components/Detailcard/Detailcard";
import { getProduct } from "../../utils/products";
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
