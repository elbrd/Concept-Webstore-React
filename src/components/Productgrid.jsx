import { useState, useEffect } from "react";
import { getProducts } from "../scripts/api/api";
import Productcard from "./Productcard";

const Productgrid = ({ addToCart, removeFromCart }) => {
  const [products, setProducts] = useState([]);

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
            removeFromCart={removeFromCart}
          />
        );
      })}
    </main>
  );
};

export default Productgrid;
