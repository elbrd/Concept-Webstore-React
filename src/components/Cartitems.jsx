import "../styles/components/cart.css";

const Cartitems = ({ item, addToCart, removeFromCart }) => {
  return (
    <article className="cart-card">
      <section>
        <img src={item.image} alt="" className="cart-card__image" />
      </section>

      <section>
        <h3 className="cart-card__title">{item.title}</h3>
        <p className="cart-card__price">{Math.ceil(item.price)} sek</p>

        <div>
          <button className="plus-minus-btn" data-action="remove">
            <i
              className="fa-solid fa-minus"
              onClick={() => {
                removeFromCart(item);
              }}
            ></i>
          </button>

          <button className="plus-minus-btn" data-action="add">
            <i
              className="fa-solid fa-plus"
              onClick={() => {
                addToCart(item);
              }}
            ></i>
          </button>
        </div>

        <p className="cart-card__amount">x{item.quantity}</p>
      </section>
    </article>
  );
};

export default Cartitems;
