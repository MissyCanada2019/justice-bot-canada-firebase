import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBnVx_LbRzI8YlxZmNEH5-6FJ-dI0zZavI",
  authDomain: "justice-bot-canada551055.firebaseapp.com",
  databaseURL: "https://justice-bot-canada551055-default-rtdb.firebaseio.com",
  projectId: "justice-bot-canada551055",
  storageBucket: "justice-bot-canada551055.firebasestorage.app",
  messagingSenderId: "10688826149",
  appId: "1:10688826149:web:f86611de914a363f8128cc"
};

const app = initializeApp(firebaseConfig);

export default app;
