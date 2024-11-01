// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDkilAaO5DiesmJsNqsyK7AtxHfsQ4CCN4",
    authDomain: "nft-based-result-management-sy.firebaseapp.com",
    projectId: "nft-based-result-management-sy",
    storageBucket: "nft-based-result-management-sy.appspot.com",
    messagingSenderId: "671731870831",
    appId: "1:671731870831:web:65f1c7e017c6e7d7eeb19a",
    measurementId: "G-WG3B2VFR9M"
  };
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;