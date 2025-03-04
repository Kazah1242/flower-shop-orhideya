import React, { useState, useMemo } from 'react';
import FlowerCard from '../components/FlowerCard';
import flowersData, { Flower } from '../data/flowersData';
import Button from '../components/UI/Button';
import StoreInfo from '../components/StoreInfo.tsx';

import FlowerGallery from '../components/FlowerGallery'; // Импортируйте новый компонент

import './MarketPage.css';



interface MarketPageProps {
  addToCart: (flower: Flower) => void;
}


const CATEGORIES = [
  'Все',
  'Розы', 
  'Альстромерия', 
  'Хризантема', 
  'Лилии',
  'Букеты', 
  'Пионы'
];

const SORT_OPTIONS = [
  { label: 'По умолчанию', value: 'default' },
  { label: 'Цена: от низкой к высокой', value: 'priceAsc' },
  { label: 'Цена: от высокой к низкой', value: 'priceDesc' }
];

const MarketPage: React.FC<MarketPageProps> = ({ addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [sortOption, setSortOption] = useState('default');

  const filteredAndSortedFlowers = useMemo(() => {
    // Сначала фильтруем
    let result = flowersData.filter(flower => {
      const matchesSearch = flower.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Все' || flower.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Затем сортируем
    switch (sortOption) {
      case 'priceAsc':
        return result.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return result.sort((a, b) => b.price - a.price);
      default:
        return result;
    }
  }, [searchTerm, selectedCategory, sortOption]);

return (
  <div className="market-page container">
    <div className="store-title-container">
      <h1 className="store-title">
        <span className="title-flower">Орхидея</span>
        <span className="title-subtitle">Цветочный Мир</span>
      </h1>
    </div>
    <FlowerGallery /> {/* Добавьте витрину с цветами */}

      <div className="filters-section">
        {/* Поиск */}
        <input 
          type="text" 
          placeholder="Поиск цветов..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Категории */}
        <div className="category-filters">
          {CATEGORIES.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'secondary'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Сортировка */}
        <div className="sort-section">
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="sort-select"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h2>Доступные цветы: {filteredAndSortedFlowers.length}</h2>
      
      {filteredAndSortedFlowers.length === 0 ? (
        <div className="no-results">
          <p>Извините, по вашему запросу цветов не найдено</p>
        </div>
      ) : (
        <div className="flower-list">
          {filteredAndSortedFlowers.map((flower) => (
            <FlowerCard 
              key={flower.id} 
              flower={flower} 
              addToCart={addToCart} 
            />
          ))}
        </div>
      )}
         <div className="store-info-section">
      <StoreInfo />
    </div>
    </div>
  );
};

export default MarketPage;