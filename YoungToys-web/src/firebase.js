// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "react-auth-project-5c2a9.firebaseapp.com",
  projectId: "react-auth-project-5c2a9",
  storageBucket: "react-auth-project-5c2a9.appspot.com",
  messagingSenderId: "390919207958",
  appId: "1:390919207958:web:99e54868a7b45d67f48937"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
