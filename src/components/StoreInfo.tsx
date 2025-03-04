import React from 'react';
import './StoreInfo.css';
import { FaPhone, FaMapMarkerAlt, FaCreditCard, FaGift, FaTruck } from 'react-icons/fa';

const StoreInfo: React.FC = () => {
  return (
    <div className="store-info">
      <div className="store-info__header">
        <h1>Орхидея</h1>
        <p className="store-info__subtitle">Магазин цветов и подарков</p>
      </div>

      <div className="store-info__content">
        <div className="store-info__contact">
          <div className="info-item">
            <FaPhone className="info-icon" />
            <a href="tel:+79127504216">+7 (912) 750-42-16</a>
          </div>
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <p>Удмуртская Республика, Глазов, улица Кирова, 35/12</p>
          </div>
        </div>

        <div className="store-info__services">
          <div className="service-grid">
            {[
              { icon: <FaTruck />, text: "Доставка" },
              { icon: <FaCreditCard />, text: "Оплата картой" },
              { icon: <FaGift />, text: "Подарочная упаковка" }
            ].map((service, index) => (
              <div key={index} className="service-item">
                {service.icon}
                <span>{service.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="store-info__features">
          <h3>Наши услуги</h3>
          <ul>
            <li>Свадебная флористика</li>
            <li>Поздравительные открытки</li>
            <li>Сладкие подарки</li>
            <li>Новогодние подарки</li>
            <li>Самовывоз</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;