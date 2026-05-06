import "../styles/components/cart.css";
import { useCartStore } from "../stores/useCartStore";

const Cartitems = ({ item }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <article className="cart-card">
      <section>
        <img src={item.image} alt="" className="cart-card__image" />
      </section>

      <section>
        <h3 className="cart-card__title">{item.title}</h3>
        <p className="cart-card__price">{Math.ceil(item.price)} sek</p>

        <div>
          <button
            className="plus-minus-btn"
            onClick={() => removeFromCart(item)}
          >
            <i className="fa-solid fa-minus"></i>
          </button>

          <button className="plus-minus-btn" onClick={() => addToCart(item)}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        <p className="cart-card__amount">x{item.quantity}</p>
      </section>
    </article>
  );
};

export default Cartitems;
