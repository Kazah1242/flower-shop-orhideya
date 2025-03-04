import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '../Nav.css';

interface NavProps {
  cartItemsCount: number;
}

const Nav: React.FC<NavProps> = ({ cartItemsCount }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">Орхидея</Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Главная</Link>
          <Link to="/reviews" className="navbar-link">Отзывы</Link>
          <Link to="/cart" className="navbar-cart">
            <FaShoppingCart />
            {cartItemsCount > 0 && (
              <span className="cart-count">{cartItemsCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;