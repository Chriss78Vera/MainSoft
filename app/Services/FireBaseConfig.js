import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const loadFirebaseConfiguration = () => {
  
  const app = initializeApp(firebaseConfig);
  global.dbCon = getFirestore();
 
};

const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXXXXXX",
  projectId: "XXXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXX"
};
