import './header.css'

const Header = () => {
    return (
        <div className="header">
            <div className="left-section">
                <a href="/" className="header-link" id='logo-image-main'>
                    <img className="logo" src="images/logo-main.png" />
                    <img className="mobile-logo" src="images/mobile-logo.png" />
                </a>
            </div>


            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search" name='searchbar' />

                <button className="search-button">
                    <img className="search-icon" src="images/search-icon.png" />
                </button>
            </div>


            <div className="right-section">
                <a href="" className="orders-link header-link">
                    <span className="orders-text">Orders</span>
                </a>

                <a href="" className="cart-link header-link">
                    <img className="cart-icon" src="images/cart-icon.png" />
                    <div className="cart-quantity">15</div>
                    <div className="cart-text">Cart</div>
                </a>
            </div>
        </div >
    )
}
export default Header