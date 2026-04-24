import { useState, useEffect } from "react";
import { getProducts } from "../scripts/api/api";
import Productcard from "./Productcard";
import { useOutletContext } from "react-router-dom";

const Productgrid = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  const { notify } = useOutletContext();

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
    }

    fetchData();
  }, []);

  return (
    <main className="product-grid">
      {products.map((product) => {
        return (
          <Productcard
            product={product}
            key={product.id}
            addToCart={addToCart}
            notify={notify}
          />
        );
      })}
    </main>
  );
};

export default Productgrid;
