import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 


// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "apiKey", 
  authDomain: "auth",
  databaseURL: "dbUrl",  
  projectId: "pId",
  storageBucket: "sBucket",
  messagingSenderId: "sId",
  appId: "apiID",
  measurementId: "measurementId",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
