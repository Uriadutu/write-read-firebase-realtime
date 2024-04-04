import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBAxmOv2c72odcdGQ2PlGZCIO2TD65iNK8",
  authDomain: "nodemcu-fb601.firebaseapp.com",
  databaseURL: "https://nodemcu-fb601-default-rtdb.firebaseio.com",
  projectId: "nodemcu-fb601",
  storageBucket: "nodemcu-fb601.appspot.com",
  messagingSenderId: "702849587999",
  appId: "1:702849587999:web:679b05fb7ba88033abee2a",
  measurementId: "G-Y10ZZ9TMSF",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
