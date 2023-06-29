// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  apiKey: "AIzaSyAKIxIG6MbwRKnCqsvxOtsbvzj7XW4OkP4",
  authDomain: "hire-tool.firebaseapp.com",
  projectId: "hire-tool",
  storageBucket: "hire-tool.appspot.com",
  messagingSenderId: "945232282261",
  appId: "1:945232282261:web:6fd8e3c3619d50e932d19c"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth();
const auth = getAuth(app);

export default auth;