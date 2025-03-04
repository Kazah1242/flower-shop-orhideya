import { db, storage } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface Flower {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  type?: 'букет' | 'композиция' | 'горшечное' | 'поштучно';
  quantity?: number;
  createdAt: Date;
  isAvailable: boolean;
}

// Получение всех цветов
export const getFlowers = async (): Promise<Flower[]> => {
  const flowersCol = collection(db, 'flowers');
  const snapshot = await getDocs(flowersCol);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Flower));
};

// Добавление нового цветка
export const addFlower = async (flowerData: Omit<Flower, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'flowers'), {
      ...flowerData,
      createdAt: new Date(),
      isAvailable: true
    });
    return docRef.id;
  } catch (error) {
    console.error('Ошибка при добавлении цветка:', error);
    throw error;
  }
};

// Загрузка изображения
export const uploadImage = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `flowers/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};