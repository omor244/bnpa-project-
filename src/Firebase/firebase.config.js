// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAu8dX8YicWsdRGknwDC35J6hE1-YqrVEk",
    authDomain: "bassa-s-project.firebaseapp.com",
    projectId: "bassa-s-project",
    storageBucket: "bassa-s-project.firebasestorage.app",
    messagingSenderId: "836110237095",
    appId: "1:836110237095:web:e2eb4e6e43ae4ba9d24a82"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

