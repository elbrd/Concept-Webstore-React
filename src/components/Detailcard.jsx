const Detailcard = ( { product }) => {
  return (
    <>
        <section className="product-gallery">
            <img className="product-image" src={product.image} alt="Product image" />
        </section>

        <section className="product-info">
            <h2 className="product-title">{product.title}</h2>

            <p className="product-category">{product.category}</p>

            <p className="product-description short"></p>

            <p className="product-description long hidden">{product.description}</p>
            
            <button className="btn-read-more">READ MORE</button>

            <div className="product-bottom">
                <span className="product-price">{Math.ceil(product.price)} sek</span>
                <button className="btn-add">ADD TO CART</button>
            </div>

        </section>
    </>
  )
}

export default Detailcard