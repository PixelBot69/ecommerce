import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './Header.css';

const Header = ({ onLogout }) => {
  const { getTotalItems } = useCart();
  
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">Rayvyn Shop</Link>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart" className="cart-link">
                Cart
                {getTotalItems() > 0 && (
                  <span className="cart-count">{getTotalItems()}</span>
                )}
              </Link>
            </li>
            <li>
              <button onClick={onLogout} className="logout-button">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;