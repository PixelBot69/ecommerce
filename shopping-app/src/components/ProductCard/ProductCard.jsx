import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    

    const button = e.target;
    button.classList.add('added');
    setTimeout(() => {
      button.classList.remove('added');
    }, 1000);
  };
  
  return (
    <div className="product-card">
      <div className="card-inner">
        <Link to={`/product/${product.id}`} className="product-link">
          <div className="product-badge">
            {product.price < 50 && <span className="badge badge-sale">Sale</span>}
            {product.id % 5 === 0 && <span className="badge badge-new">New</span>}
          </div>
          
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          
          <div className="product-info">
            <p className="product-category">{product.category}</p>
            <h3 className="product-title">{product.title}</h3>
            <div className="product-price-row">
              <p className="product-price">${product.price.toFixed(2)}</p>
              <div className="product-rating">
                <span className="stars">{'★'.repeat(Math.round(product.rating?.rate || 4))}</span>
                <span className="rating-count">({product.rating?.count || '25'})</span>
              </div>
            </div>
          </div>
        </Link>
        
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          <span className="btn-text">Add to Cart</span>
          <span className="btn-icon">+</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;