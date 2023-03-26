import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCb7ZgBTWljUMhCKj2wloKB0UMSakL8ZC0",
  authDomain: "todo-app-a0d68.firebaseapp.com",
  projectId: "todo-app-a0d68",
  storageBucket: "todo-app-a0d68.appspot.com",
  messagingSenderId: "225824553987",
  appId: "1:225824553987:web:f88c17d5df37f0ee0ea236"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);