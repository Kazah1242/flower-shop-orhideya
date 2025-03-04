import roseBUK from '../assets/roseBUK.jpeg';
import bu2 from '../assets/Bu2.jpeg';
import bu3 from '../assets/Bu3.jpeg';
import boom from '../assets/boom.jpeg';
import a from '../assets/1.jpeg';
import b from '../assets/2.jpeg';






export interface Flower {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  type?: 'букет' | 'композиция' | 'горшечное' | 'поштучно';
  quantity?: number; 
}

const flowersData: Flower[] = [
  {
    id: 1,
    name: 'Цвет радуги',
    price: 3200,
    category: 'Букеты',
    description: 'Розы сорта Лола, эустома и хамелацеум',
    imageUrl: roseBUK,
    type: 'букет'
  },
  {
    id: 2,
    name: 'Альстермерия',
    price: 3300,
    category: 'Букеты',
    description: 'Букет из кустовой розы и альстермерии',
    imageUrl: bu2,
    type: 'букет'
  },
  {
    id: 3, 
    name: 'Солнечный Всплеск',
    price: 1600,
    category: 'Букеты', 
    description: 'Сборный яркий букет!',
    imageUrl: bu3, 
    type: 'букет',
  },
  {
    id: 4, 
    name: 'Бомбастик',
    price: 3400,
    category: 'Букеты', 
    description: 'Букет из пионовидных куствовых роз и эвкалипта. Цена за 7 веток розы!',
    imageUrl: boom, 
    type: 'букет'
  },
  {
    id: 5, 
    name: 'Золотая осень',
    price: 1800,
    category: 'Букеты', 
    description: 'В букете гербера, хризантемы, эустома, зелень',
    imageUrl: a, 
    type: 'букет'
  },
  {
    id: 6, 
    name: 'Гипсофилы',
    price: 1600,
    category: 'Букеты', 
    description: 'Букет из цветной гипсофилы',
    imageUrl: b, 
    type: 'букет'
  }
  
];
export default flowersData;