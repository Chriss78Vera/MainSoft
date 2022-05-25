import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const loadFirebaseConfiguration = () => {
  console.log("FUNCIONA")
  const app = initializeApp(firebaseConfig);
  global.dbCon = getFirestore();
  console.log("TERMINA EL FIREBASE")
};

const firebaseConfig = {
    apiKey: "AIzaSyDcEK-knhcROt1cd51KUhAxoy74ZhTnxnU",
    authDomain: "mainsoft-11a18.firebaseapp.com",
    projectId: "mainsoft-11a18",
    storageBucket: "mainsoft-11a18.appspot.com",
    messagingSenderId: "60993422426",
    appId: "1:60993422426:web:fe049fa41cd3b20755c463"
  };