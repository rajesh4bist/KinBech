const ProductsGrid = () => {
    return (
        <div className="main-container-homepage">
            <div>
                <img src="images/Products/2-slot-toaster-white.jpg" alt="" className="product-image" />
                <p className="name-of-product">2-slot-toaster-white</p>
                <div className="rating-container">
                    <img src="images/Products/rating-40.png" alt="" className="rating-image" />
                    <p className="rating-number">90</p>
                </div>
                <p className="price-of-product">$10.99</p>
                <select name="dropdown-item" id="" className="dropdown-number" >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
                <button className="add-to-cart-btn">Add to Cart</button>
            </div>
        </div>
    )
}
export default ProductsGrid;