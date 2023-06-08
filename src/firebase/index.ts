import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBtzsbi2ywtJGAfhnUN2QKRmInrN2JVePg",
  authDomain: "project-c653f.firebaseapp.com",
  databaseURL: "https://project-c653f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-c653f",
  storageBucket: "project-c653f.appspot.com",
  messagingSenderId: "1011946270236",
  appId: "1:1011946270236:web:53ee378cca6b4f829ff9d9",
  measurementId: "G-22HY6RBWM5"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);