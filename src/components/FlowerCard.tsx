import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flower } from '../data/flowersData';
import Button from './UI/Button';
import './FlowerCard.css';

interface FlowerCardProps {
  flower: Flower;
  addToCart: (flower: Flower) => void;
}

const FlowerCard: React.FC<FlowerCardProps> = React.memo(({ flower, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(0, prev + change));
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      const flowerWithQuantity = { ...flower, quantity };
      addToCart(flowerWithQuantity);
      // Опционально сбрасываем количество после добавления
      setQuantity(0);
    }
  };

  return (
    <div className="flower-card">
      <Link to={`/flower/${flower.id}`}>
        <img 
          src={flower.imageUrl} 
          alt={flower.name} 
          className="flower-image" 
          loading="lazy"
        />
      </Link>
      <div className="flower-details">
        <h3>{flower.name}</h3>
        <p className="flower-price">{flower.price} ₽</p>
        <p className="flower-description">{flower.description}</p>
        
        <div className="flower-actions">
          <div className="quantity-control">
            <Button 
              variant="secondary" 
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="quantity-btn"
            >
              -
            </Button>
            <span className="quantity-display">{quantity}</span>
            <Button 
              variant="secondary" 
              onClick={() => handleQuantityChange(1)}
              className="quantity-btn"
            >
              +
            </Button>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            variant="primary"
          >
            в корзину
          </Button>
        </div>
      </div>
    </div>
  );
});

export default FlowerCard;