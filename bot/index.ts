import TelegramBot from 'node-telegram-bot-api';
import { addFlower, updateFlower, deleteFlower, uploadImage, Flower } from '../src/data/flowersData';

const token = '8086967826:AAF_AXLDnVZhgVdnLTy9tCfw5pqhYBu_of8';
const bot = new TelegramBot(token, { polling: true });

// Состояния для разных этапов добавления цветка
interface UserState {
  step: 'name' | 'price' | 'category' | 'description' | 'photo' | 'type';
  flowerData: Partial<Flower>;
}

const userStates = new Map<number, UserState>();

// Команда для начала добавления нового цветка
bot.onText(/\/addflower/, (msg) => {
  const chatId = msg.chat.id;
  userStates.set(chatId, {
    step: 'name',
    flowerData: {}
  });
  bot.sendMessage(chatId, 'Введите название цветка:');
});

// Обработка текстовых сообщений
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const state = userStates.get(chatId);

  if (!state) return;

  switch (state.step) {
    case 'name':
      state.flowerData.name = msg.text;
      state.step = 'price';
      bot.sendMessage(chatId, 'Введите цену:');
      break;

    case 'price':
      state.flowerData.price = Number(msg.text);
      state.step = 'category';
      bot.sendMessage(chatId, 'Введите категорию:');
      break;

    case 'category':
      state.flowerData.category = msg.text;
      state.step = 'description';
      bot.sendMessage(chatId, 'Введите описание:');
      break;

    case 'description':
      state.flowerData.description = msg.text;
      state.step = 'photo';
      bot.sendMessage(chatId, 'Отправьте фото цветка:');
      break;
  }

  userStates.set(chatId, state);
});

// Обработка фотографий
bot.on('photo', async (msg) => {
  const chatId = msg.chat.id;
  const state = userStates.get(chatId);

  if (!state || state.step !== 'photo') return;

  try {
    const photo = msg.photo[msg.photo.length - 1];
    const file = await bot.getFile(photo.file_id);
    const imageUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;

    state.flowerData.imageUrl = imageUrl;
    
    // Добавляем цветок в базу данных
    await addFlower(state.flowerData);
    
    bot.sendMessage(chatId, 'Цветок успешно добавлен!');
    userStates.delete(chatId);
  } catch (error) {
    bot.sendMessage(chatId, 'Произошла ошибка при добавлении цветка.');
    userStates.delete(chatId);
  }
});

// Запуск бота
bot.on('polling_error', (error) => {
  console.log(error);
}); 