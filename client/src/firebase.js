// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogadmin-54b1a.firebaseapp.com",
  projectId: "blogadmin-54b1a",
  storageBucket: "blogadmin-54b1a.appspot.com",
  messagingSenderId: "890063234786",
  appId: "1:890063234786:web:c46028ff1ef5669a19e0bb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
