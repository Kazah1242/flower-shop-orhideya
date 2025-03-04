import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flower } from '../data/flowersData';
import Button from '../components/UI/Button';
import OrderModal, { OrderData } from '../components/OrderModal';
import './CartPage.css';

interface CartPageProps {
  cart: Flower[];
  removeFromCart: (flower: Flower) => void;
  updateQuantity: (flower: Flower, quantity: number) => void;
  total: number;
}

const CartPage: React.FC<CartPageProps> = ({ 
  cart, 
  removeFromCart, 
  updateQuantity,
  total 
}) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleQuantityChange = (flower: Flower, change: number) => {
    const newQuantity = (flower.quantity || 1) + change;
    if (newQuantity > 0) {
      updateQuantity(flower, newQuantity);
    }
  };

  const handleCreateOrder = (orderData: OrderData) => {

    console.log('Заказ обработан:', orderData);
  };

  return (
    <div className="cart-page container">
      <div className="cart-header">
        <h1>Корзина</h1>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="secondary">
            Продолжить покупки
          </Button>
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Ваша корзина пуста</h2>
          <p>Добавьте товары из каталога</p>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="primary">
              Перейти в каталог
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items-container">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="cart-item-image" 
                />
                <div className="cart-item-details">
                  <div className="cart-item-header">
                    <h3>{item.name}</h3>
                    <p>{item.price} ₽</p>
                  </div>
                  
                  <div className="cart-item-quantity">
                    <div className="quantity-control">
                      <Button 
                        variant="secondary" 
                        onClick={() => handleQuantityChange(item, -1)}
                        className="quantity-btn"
                        disabled={item.quantity === 1}
                      >
                        -
                      </Button>
                      <span>{item.quantity || 1}</span>
                      <Button 
                        variant="secondary" 
                        onClick={() => handleQuantityChange(item, 1)}
                        className="quantity-btn"
                      >
                        +
                      </Button>
                    </div>
                    <Button 
                      onClick={() => removeFromCart(item)}
                      variant="danger"
                    >
                      Удалить
                    </Button>
                  </div>
                  <div className="cart-item-subtotal">
                    Сумма: {(item.price * (item.quantity || 1)).toLocaleString()} ₽
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total-details">
              <div className="cart-total-line">
                <span>Количество товаров:</span>
                <span>{cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} шт.</span>
              </div>
              <div className="cart-total-line">
                <span>Сумма заказа:</span>
                <span>{total.toLocaleString()} ₽</span>
              </div>
            </div>
            <div className="cart-total">
              Итого: {total.toLocaleString()} ₽
            </div>
          </div>

          <div className="checkout-actions">
            <Button 
              variant="primary" 
              onClick={() => setIsOrderModalOpen(true)}
              disabled={cart.length === 0}
            >
              Оформить заказ
            </Button>
          </div>
        </>
      )}

      {/* Модальное окно оформления заказа */}
      {isOrderModalOpen && (
        <OrderModal 
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          onSubmit={handleCreateOrder}
          total={total}
          cart={cart}
        />
      )}
    </div>
  );
};

export default CartPage;