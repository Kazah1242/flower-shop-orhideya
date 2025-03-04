// src/components/FlowerGallery.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import flowersData from '../data/flowersData';
import './FlowerGallery.css';

const FlowerGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Используем navigate

  // Автоматическая смена слайдов
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % flowersData.length
      );
    }, 5000); // Смена каждые 5 секунд

    return () => clearInterval(timer);
  }, []);

  // Обработчик для ручной навигации
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? flowersData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % flowersData.length
    );
  };

  // Обработчик клика по изображению
  const handleImageClick = (flowerId: number) => {
    navigate(`/flower/${flowerId}`); // Используем navigate
  };

  // Получаем текущий отображаемый цветок
  const currentFlower = flowersData[currentIndex];

  return (
    <div className="flower-gallery-slider">
      <div className="slider-container">
        <button 
          className="slider-arrow slider-arrow-left" 
          onClick={handlePrev}
        >
          &#10094;
        </button>

        <div 
          className="slider-image-container"
          onClick={() => handleImageClick(currentFlower.id)}
          style={{ cursor: 'pointer' }} // Добавляем cursor для наглядности
        >
          {flowersData.map((flower, index) => (
            <div 
              key={flower.id}
              className={`slider-image ${
                index === currentIndex ? 'active' : ''
              }`}
            >
              <img 
                src={flower.imageUrl} 
                alt={flower.name} 
                className="slider-image-item"
              />
            </div>
          ))}
        </div>

        <button 
          className="slider-arrow slider-arrow-right" 
          onClick={handleNext}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default FlowerGallery;