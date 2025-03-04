import React, { useState } from 'react';
import { Flower } from '../data/flowersData';
import Button from './UI/Button';
import './OrderModal.css';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orderData: OrderData) => void;
  total: number;
  cart: Flower[];
}

export interface OrderData {
  name: string;
  phone: string;
  address: string;
  comment?: string;
}

const OrderModal: React.FC<OrderModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  total,
  cart
}) => {
  const [orderData, setOrderData] = useState<OrderData>({
    name: '',
    phone: '+7',
    address: '',
    comment: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Специальная обработка для номера телефона
    if (name === 'phone') {
      // Разрешаем только цифры и плюс, максимальная длина 12 символов
      const formattedPhone = value
        .replace(/[^\d+]/g, '')  // Удаляем все кроме цифр и плюса
        .slice(0, 12);  // Ограничиваем длину
      
      setOrderData(prev => ({
        ...prev,
        [name]: formattedPhone
      }));
      return;
    }

    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Валидация номера телефона
    if (!orderData.phone.startsWith('+7') || orderData.phone.length < 11) {
      alert('Введите корректный номер телефона (например, +79991234567)');
      return;
    }
  
    // Базовая валидация
    if (!orderData.name || !orderData.phone || !orderData.address) {
      alert('Пожалуйста, заполните обязательные поля');
      return;
    }
  
    // Формируем текст для Telegram с изображениями
    const telegramMessage = `
  Новый заказ:
  
  Имя: ${orderData.name}
  Телефон: ${orderData.phone}
  Адрес: ${orderData.address}
  Комментарий: ${orderData.comment || 'Нет'}
  
  Товары:
  ${cart.map(item => 
    `- ${item.name} (${item.quantity} шт.) - ${item.price * (item.quantity || 1)} ₽\nСсылка на изображение: https://zav-golos.online${item.imageUrl}`
  ).join('\n')}
  
  Итого: ${total} ₽
    `;
  
    // Кодируем сообщение для URL
    const encodedMessage = encodeURIComponent(telegramMessage);
  
    // Открываем чат с менеджером в Telegram
    const telegramLink = `https://t.me/+79127504216?text=${encodedMessage}`;
    
    try {
      // Копируем заказ в буфер обмена
      await navigator.clipboard.writeText(telegramMessage);
      
      // Открываем чат в новой вкладке
      window.open(telegramLink, '_blank');
      
      // Вызываем коллбэк с данными заказа
      onSubmit(orderData);
      
      // Закрываем модальное окно
      onClose();
  
      // Уведомление пользователя
      alert('Заказ скопирован и открыт в Telegram. Менеджер свяжется с вами.');
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
      alert('Произошла ошибка. Попробуйте еще раз.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="order-modal-overlay">
      <div className="order-modal">
        <h2>Оформление заказа</h2>
        <p>Итого к оплате: {total} ₽</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">ФИО*</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={orderData.name}
              onChange={handleInputChange}
              required
              placeholder="Введите ФИО"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Телефон*</label>
            <input 
              type="text" 
              id="phone"
              name="phone"
              value={orderData.phone}
              onChange={handleInputChange}
              required
              placeholder="+7 (999) 123-45-67"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Адрес доставки*</label>
            <input 
              type="text" 
              id="address"
              name="address"
              value={orderData.address}
              onChange={handleInputChange}
              required
              placeholder="Введите адрес доставки"
            />
          </div>

          <div className="form-group">
            <label htmlFor="comment">Комментарий</label>
            <textarea 
              id="comment"
              name="comment"
              value={orderData.comment}
              onChange={handleInputChange}
              placeholder="Дополнительные пожелания (необязательно)"
            />
          </div>

          <div className="modal-actions">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={onClose}
            >
              Отмена
            </Button>
            <Button 
              type="submit" 
              variant="primary"
            >
              Оформить заказ
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;