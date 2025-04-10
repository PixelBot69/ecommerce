
import { Link } from 'react-router-dom';
import './CartItem.css';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="cart-item-details">
        <h3 className="cart-item-title">
          <Link to={`/product/${item.id}`}>{item.title}</Link>
        </h3>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-control">
          <button 
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="quantity-btn"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="item-quantity">{item.quantity}</span>
          <button 
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="quantity-btn"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <p className="item-total">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button 
          onClick={() => onRemove(item.id)}
          className="remove-button"
          aria-label="Remove item"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;