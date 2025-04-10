import { useEffect } from 'react';
import './AlertPopup.css';

const AlertPopup = ({ message, isVisible, onClose, autoHideTime = 4000 }) => {
  useEffect(() => {
    if (isVisible && autoHideTime) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideTime);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHideTime, onClose]);

  if (!isVisible) return null;

  return (
    <div className="alert-popup">
      <div className="alert-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default AlertPopup;