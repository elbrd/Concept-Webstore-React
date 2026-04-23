import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Detailcard from "../components/Detailcard";
import { getProduct } from "../scripts/api/api";
import "../styles/pages/product.css";

const DetailPage = () => {
  const { cartObj } = useOutletContext();

  const { id } = useParams();

  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchData(id) {
      const data = await getProduct(id);
      setProduct(data);
    }

    fetchData(id);
  }, [id]);

  return (
    <main className="product-page">
      <Detailcard product={product} addToCart={cartObj.addToCart} />
    </main>
  );
};

export default DetailPage;
