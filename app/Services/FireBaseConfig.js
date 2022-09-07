import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const loadFirebaseConfiguration = () => {
  
  const app = initializeApp(firebaseConfig);
  global.dbCon = getFirestore();
 
};

const firebaseConfig = {
  apiKey: "AIzaSyBzjefHHmkLhC-qvd-ikSodWWRx2QHQLKg",
  authDomain: "miproyecto-d157b.firebaseapp.com",
  projectId: "miproyecto-d157b",
  storageBucket: "miproyecto-d157b.appspot.com",
  messagingSenderId: "510856880730",
  appId: "1:510856880730:web:3b84cf279f835573196e63"
};
