import React from 'react';
import { FaStar, FaExternalLinkAlt} from 'react-icons/fa';
import './ReviewsPage.css';

interface Review {
  id: number;
  author: string;
  date: string;
  text: string;
  avatar?: string;
  rating?: number;
}

const reviews: Review[] = [
  {
    id: 1,
    author: 'Татьяна Ф.',
    date: '25 февраля 2025',
    text: 'Хочу выразить свою благодарность данной компании за качественное и чёткое выполнение заказа. Спасибо за внимание, отзывчивость! Очень переживали, т.к. впервые заказывали в Глазове удалённо, но все было выполнено в срок! Очень рекомендую и спасибо за ваш труд!'
  },
  {
    id: 2,
    author: 'Ирина Конькова',
    date: '26 ноября 2024',
    text: 'Отличные цветы, вежливый персонал🥀'
  },
  {
    id: 3,
    author: 'Марина Зворыгина',
    date: '8 ноября 2024',
    text: 'Делали заказ на букет и композицию очаровательной, нежной девушке, все выполнено безупречно, именинница очень довольна👍'
  },
  {
    id: 4,
    author: 'Николай Видмах',
    date: '18 июля 2024',
    text: 'Хорошее заведение, приветливые продавцы всё покажут, всё расскажут'
  },
  {
    id: 5,
    author: 'Саша Бузанаков',
    date: '4 мая 2024',
    text: 'Хороший магазин, большой выбор, шикарные букеты!'
  },
  {
    id: 6,
    author: 'Кирилл Мандела',
    date: '6 января 2024',
    text: 'Лучшие цветы в городе'
  },
  {
    id: 7,
    author: 'Алина Касимова',
    date: '25 ноября 2024',
    text: 'Недавно посетила этот цветочный магазин, и осталась очень довольна обслуживанием! Сотрудники были дружелюбны и готовы помочь с выбором. Я искала букет для особого случая, и продавец предложила несколько вариантов, учитывая мои пожелания и бюджет. Кроме того, магазин предлагает широкий ассортимент цветов и композиций, что приятно удивило. Заказ был выполнен быстро и качественно. Также порадовало, что цветы были свежими и красиво оформленными. Обязательно вернусь снова и рекомендую всем, кто ищет отличный сервис и красивые цветы!'
  },
  {
    id: 8,
    author: 'Даша',
    date: '22 октября 2024',
    text: 'Отличный магазин. Оформляла доставку. Букет получился очень красивый, цветы доставили вовремя, все пожелания были учтены, продавец очень оперативно отвечает. Большое спасибо, буду обращаться еще 💐'
  },
  {
    id: 9,
    author: 'Любовь Гуляева',
    date: '3 июня 2024',
    text: 'Лучший магазин цветов в Глазове! Всегда свежие цветы, вежливые и хорошие девочки! Однозначно рекомендую!'
  },
  {
    id: 10,
    author: 'Татьяна С.',
    date: '24 марта 2024',
    text: 'Выражаю благодарность за доставленное удовольствие и получателю и отправителю. Сделали красивый букет, подписали открытку, надули шары. Всё оперативно, красиво и не дорого. Приятно было общаться, отвечали на все вопросы, выполнили все пожелания. Очень рекомендую.'
  }
];


const ReviewsPage: React.FC = () => {
  return (
    <div className="reviews-page">
      <div className="reviews-header">
        <h1>Отзывы наших клиентов</h1>
        <div className="rating-summary">
          <div className="rating-number">4.9</div>
          <div className="rating-stars">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="star" />
            ))}
          </div>
          <div className="reviews-count">50 отзывов</div>
        </div>
      </div>

      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div className="avatar">
                <div className="avatar-placeholder">
                  {review.author[0]}
                </div>
              </div>
              <div className="review-info">
                <div className="author-details">
                  <h3 className="author-name">{review.author}</h3>
                </div>
                <span className="review-date">{review.date}</span>
              </div>
            </div>
            <p className="review-text">{review.text}</p>
          </div>
        ))}
      </div>

      <div className="more-reviews">
        <a 
          href="https://orhideja-1637057641.clients.site/?ysclid=m7ng86p8165011645" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="more-reviews-button"
        >
          Больше отзывов <FaExternalLinkAlt className="external-link-icon" />
        </a>
      </div>
    </div>
  );
};

export default ReviewsPage;