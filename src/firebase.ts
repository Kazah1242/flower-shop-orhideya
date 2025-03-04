import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "ваш_api_key",
  authDomain: "ваш_project.firebaseapp.com",
  projectId: "ваш_project_id",
  storageBucket: "ваш_project.appspot.com",
  messagingSenderId: "ваш_messaging_sender_id",
  appId: "ваш_app_id"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация сервисов
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 