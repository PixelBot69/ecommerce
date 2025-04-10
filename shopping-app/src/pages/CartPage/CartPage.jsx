import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import AlertPopup from '../../components/AlertPopup/AlertPopup';
import './CartPage.css';

const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice 
  } = useCart();
  
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setShowConfirmation(true);
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      
      <AlertPopup 
        message="Order placed successfully!" 
        isVisible={showConfirmation} 
        onClose={() => setShowConfirmation(false)} 
        autoHideTime={4000} 
      />
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                onUpdateQuantity={updateQuantity} 
                onRemove={removeFromCart} 
              />
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="cart-totals">
              <p className="cart-total">
                <span>Total:</span>
                <span>${getTotalPrice()}</span>
              </p>
            </div>
            <div className="cart-actions">
              <Link to="/" className="continue-shopping">
                Continue Shopping
              </Link>
              <button 
                onClick={handleCheckout}
                className="checkout-button"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;