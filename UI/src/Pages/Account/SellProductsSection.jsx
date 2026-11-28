import { useState } from 'react';
import { Link } from 'react-router'

const SellProducts = ({ activeTab }) => {
    const [listings, setListings] = useState([])

    const handleRemoveListing = (id) => {
        if (!window.confirm('Remove this listing?')) return;
        setListings((prev) => prev.filter((item) => item.id !== id))
    }

    return (
        <>
            {activeTab === 'sell' && (
                <>
                    <section className="account-card">
                        <div className="account-card-head">
                            <h2>Sell Your Products</h2>
                            <p>Turn what you no longer need, or what you make, into money. List a product in a few minutes.</p>
                        </div>
                        <ol className="account-steps">
                            <li className="account-step">
                                <span className="account-step-num">1</span>
                                <div>
                                    <h3>List your product</h3>
                                    <p>Add photos, a price and a short description.</p>
                                </div>
                            </li>
                            <li className="account-step">
                                <span className="account-step-num">2</span>
                                <div>
                                    <h3>Get orders</h3>
                                    <p>Buyers find your listing and place orders with you.</p>
                                </div>
                            </li>
                            <li className="account-step">
                                <span className="account-step-num">3</span>
                                <div>
                                    <h3>Deliver and get paid</h3>
                                    <p>Hand over the item and receive your payment.</p>
                                </div>
                            </li>
                        </ol>
                        <div className="account-actions">
                            <Link to="/sell/new" className="account-btn account-btn-primary">
                                + Add New Product
                            </Link>
                        </div>
                    </section>

                    <section className="account-card">
                        <div className="account-card-head">
                            <h2>Your Listings</h2>
                            <p>Products you have put up for sale.</p>
                        </div>

                        {listings.length === 0 ? (
                            <div className="account-empty">
                                <p>You haven't listed anything yet.</p>
                                <Link to="/sell/new" className="account-btn account-btn-outline">
                                    List your first product
                                </Link>
                            </div>
                        ) : (
                            <ul className="account-listings">
                                {listings.map((item) => (
                                    <li className="account-listing" key={item.id}>
                                        <div className="account-listing-thumb">
                                            {item.image ? <img src={item.image} alt={item.name} /> : item.name[0]}
                                        </div>
                                        <div className="account-listing-info">
                                            <h3>{item.name}</h3>
                                            <p>{CURRENCY} {item.price} · {item.quantity} in stock</p>
                                        </div>
                                        <div className="account-listing-actions">
                                            <Link to={`/sell/edit/${item.id}`} className="account-btn account-btn-outline account-btn-sm">
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                className="account-btn account-btn-danger account-btn-sm"
                                                onClick={() => handleRemoveListing(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </>
            )}
        </>
    )
}

export default SellProducts;