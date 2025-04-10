import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../services/api';
import { useCart } from '../../contexts/CartContext';
import { ArrowLeft, ShoppingBag, Star, Heart, Share2, Truck } from 'lucide-react';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [wishlistActive, setWishlistActive] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  const toggleWishlist = () => {
    setWishlistActive(!wishlistActive);
  };

  if (isLoading) {
    return (
      <div className="product-loading">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="product-error">{error}</div>;
  }

  if (!product) {
    return <div className="product-error">Product not found</div>;
  }

  
  const rating = (Math.random() * 2 + 3).toFixed(1); 
  const reviewCount = Math.floor(Math.random() * 500) + 50;

  return (
    <div className="product-detail-container">
      <button 
        className="back-to-products"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} />
        <span>Back to Products</span>
      </button>
      
      <div className="product-detail">
        <div className="product-detail-left">
          <div className="product-detail-image">
            <img src={product.image} alt={product.title} />
          </div>
        </div>
        
        <div className="product-detail-right">
          <div className="product-meta">
            <span className="product-detail-category">{product.category}</span>
            <div className="product-rating">
              <Star size={16} fill="#FFC107" color="#FFC107" />
              <span>{rating}</span>
              <span className="review-count">({reviewCount} reviews)</span>
            </div>
          </div>
          
          <h1 className="product-detail-title">{product.title}</h1>
          
          <div className="product-detail-price-container">
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            <p className="stock-status in-stock">In Stock</p>
          </div>
          
          <p className="product-detail-description">{product.description}</p>
          
          <div className="product-details-divider"></div>
          
          <div className="product-detail-actions">
            <div className="quantity-selector">
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              />
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
            
            <div className="action-buttons">
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                <span>Add to Cart</span>
              </button>
              
              <button 
                className={`wishlist-btn ${wishlistActive ? 'active' : ''}`}
                onClick={toggleWishlist}
              >
                <Heart size={18} fill={wishlistActive ? "#ef4444" : "none"} color={wishlistActive ? "#ef4444" : "#374151"} />
              </button>
              
              <button className="share-btn">
                <Share2 size={18} />
              </button>
            </div>
          </div>
          
          <div className="product-details-divider"></div>
          
          <div className="product-features">
            <div className="feature">
              <Truck size={18} />
              <div className="feature-text">
                <h4>Free Shipping</h4>
                <p>On orders over $50</p>
              </div>
            </div>
            
            <div className="feature">
              <div className="return-icon">30</div>
              <div className="feature-text">
                <h4>30-Day Returns</h4>
                <p>Satisfaction guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;