
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBKuahHuuc3I7GBkYxPfiQAFFalNIcvM10",
  authDomain: "app-ejercicio1-660c7.firebaseapp.com",
  databaseURL: "https://app-ejercicio1-660c7-default-rtdb.firebaseio.com",
  projectId: "app-ejercicio1-660c7",
  storageBucket: "app-ejercicio1-660c7.firebasestorage.app",
  messagingSenderId: "355467792358",
  appId: "1:355467792358:web:00b5c7d412abc54e841027"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);