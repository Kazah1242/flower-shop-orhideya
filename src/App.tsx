import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Импорт страниц
import MarketPage from './pages/MarketPage';
import CartPage from './pages/CartPage';
import FlowerDetailPage from './pages/FlowerDetailPage';
import ReviewsPage from './pages/ReviewsPage';
import Nav from './components/Nav';

// Импорт типов и данных
import { Flower } from './data/flowersData';

// Импорт компонентов
import Notification from './components/UI/Notification';

// Импорт стилей
import './styles/global.css';

function App() {
  // Состояние корзины
  const [cart, setCart] = useState<Flower[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Состояние уведомлений
  const [notification, setNotification] = useState<{
    message: string;
    type?: 'success' | 'error' | 'warning';
  } | null>(null);

  // Добавление товара в корзину
  const addToCart = useCallback((flower: Flower) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === flower.id);
      
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map(item => 
          item.id === flower.id 
            ? {...item, quantity: (item.quantity || 1) + (flower.quantity || 1)} 
            : item
        );
      } else {
        updatedCart = [...prevCart, {...flower, quantity: flower.quantity || 1}];
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setNotification({
        message: `${flower.name} обновлен в корзине`,
        type: 'success'
      });
      
      return updatedCart;
    });
  }, []);

  // Удаление товара из корзины
  const removeFromCart = useCallback((flower: Flower) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== flower.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setNotification({
        message: 'Товар удален из корзины',
        type: 'success'
      });
      return updatedCart;
    });
  }, []);

  // Обновление количества товара в корзине
  const updateQuantity = useCallback((flower: Flower, quantity: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => 
        item.id === flower.id 
          ? {...item, quantity: quantity} 
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  // Закрытие уведомления
  const closeNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // Расчет общей стоимости корзины
  const total = cart.reduce((acc, item) => 
    acc + (item.price * (item.quantity || 1)), 0
  );

  // Подсчет количества товаров в корзине для Nav
  const cartItemsCount = cart.reduce((acc, item) => 
    acc + (item.quantity || 1), 0
  );

  return (
    <Router>
      <div className="App">
        <Nav cartItemsCount={cartItemsCount} />

        <Routes>
          <Route path="/" element={<MarketPage addToCart={addToCart} />} />
          <Route path="/cart" element={
            <CartPage 
              cart={cart} 
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              total={total}
            />
          } />
          <Route path="/flower/:id" element={<FlowerDetailPage addToCart={addToCart} />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Routes>

        {notification && <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={closeNotification} 
        />}
      </div>
    </Router>
  );
}

export default App;