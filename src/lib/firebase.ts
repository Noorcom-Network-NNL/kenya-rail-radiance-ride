// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuuSZKtSv4faRwaddZYBHXzHh-WqWJXV0",
  authDomain: "kenya-railway-onboard.firebaseapp.com",
  projectId: "kenya-railway-onboard",
  storageBucket: "kenya-railway-onboard.firebasestorage.app",
  messagingSenderId: "542074488011",
  appId: "1:542074488011:web:4a6acc5a228ec2e6b7074e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;