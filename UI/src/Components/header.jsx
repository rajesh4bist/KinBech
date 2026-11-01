import { Link } from 'react-router'
import './header.css'

const Header = () => {
    return (
        <div className="header">
            <div className="left-section">
                <Link to="/" className="header-link" id='logo-image-main'>
                    <img className="logo" src="/images/logo-main.png" />
                    <img className="mobile-logo" src="/images/mobile-logo.png" />
                </Link>
            </div>


            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search" name='searchbar' />

                <button className="search-button">
                    <img className="search-icon" src="/images/search-icon.png" />
                </button>
            </div>


            <div className="right-section">
                <Link to="orders" className="orders-link header-link">
                    <span className="orders-text">Orders</span>
                </Link>

                <Link to="cart" className="cart-link header-link">
                    <img className="cart-icon" src="/images/cart-icon.png" />
                    <div className="cart-quantity">15</div>
                    <div className="cart-text">Cart</div>
                </Link>

                <Link to="signup" className="signup-link header-link">
                    <div>Sign Up</div>
                </Link>
            </div>
        </div >
    )
}
export default Header