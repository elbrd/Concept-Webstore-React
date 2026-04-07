import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import StartPage from "./pages/StartPage";
import DetailPage from "./pages/DetailPage";
import { useEffect, useState } from "react";
import Cartdropdown from "./components/Cartdropdown";

function App() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    console.log(cart);
  }, [cart]);

  // Add to cart
  function addToCart(item) {
    const existingProduct = cart.find((i) => i.id === item.id);

    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((i) => {
          if (i.id === item.id) {
            return {
              ...i,
              quantity: i.quantity + 1,
            };
          }
          return i;
        }),
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          id: item.id,
          image: item.image,
          title: item.title,
          price: item.price,
          quantity: 1,
        },
      ]);
    }
  }

  // Remove from cart
  function removeFromCart(item) {
    const existingProduct = cart.find((i) => i.id === item.id);

    if (!existingProduct) return;

    if (existingProduct.quantity > 1) {
      setCart((prevCart) =>
        prevCart.map((i) => {
          if (i.id === item.id) {
            return {
              ...i,
              quantity: i.quantity - 1,
            };
          }
          return i;
        }),
      );
    } else {
      setCart((prevCart) => prevCart.filter((i) => i.id !== item.id));
    }
  }

  // Toggle visibility cart dropdown
  const [cartdropdown, toggleCartdropdown] = useState(false);

  return (
    <div className="app">
      <Header toggleCartdropdown={toggleCartdropdown} />
      {!cartdropdown ? (
        ""
      ) : (
        <Cartdropdown
          toggleCartdropdown={toggleCartdropdown}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <StartPage addToCart={addToCart} removeFromCart={removeFromCart} />
          }
        />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
