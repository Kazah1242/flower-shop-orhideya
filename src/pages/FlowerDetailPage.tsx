// src/pages/FlowerDetailPage.tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import flowersData from '../data/flowersData';
import Button from '../components/UI/Button';
import './FlowerDetailPage.css';

interface FlowerDetailPageProps {
  addToCart: (flower: any) => void; // Типизируйте точный тип
}

const FlowerDetailPage: React.FC<FlowerDetailPageProps> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);

  // Найдем цветок по ID
  const flower = flowersData.find(f => f.id === Number(id));

  if (!flower) {
    return <div>Цветок не найден</div>;
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    const flowerWithQuantity = { ...flower, quantity };
    addToCart(flowerWithQuantity);
  };

  return (
    <div className="fdp-container">
      <div className="fdp-header">
        <Link to="/" className="fdp-back-link">
          <Button variant="secondary">
            ← Назад в каталог
          </Button>
        </Link>
      </div>
  
      <div className="fdp-content">
        <div className="fdp-image-container">
          <img 
            src={flower.imageUrl} 
            alt={flower.name} 
            className="fdp-image" 
          />
        </div>
  
        <div className="fdp-info">
          <h1 className="fdp-title">{flower.name}</h1>
          <p className="fdp-category">Категория: {flower.category}</p>
          <p className="fdp-price">{flower.price} ₽</p>
          <p className="fdp-description">{flower.description}</p>
  
          <div className="fdp-actions">
            <div className="fdp-quantity-control">
              <Button 
                variant="secondary" 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="fdp-quantity-btn"
              >
                -
              </Button>
              <span className="fdp-quantity-display">{quantity}</span>
              <Button 
                variant="secondary" 
                onClick={() => handleQuantityChange(1)}
                className="fdp-quantity-btn"
              >
                +
              </Button>
            </div>
            
            <Button 
              onClick={handleAddToCart}
              variant="primary"
              className="fdp-add-to-cart"
            >
              Добавить в корзину
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowerDetailPage;