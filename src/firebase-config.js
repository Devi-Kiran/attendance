import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getFID } from "web-vitals";

const firebaseConfig = {
    apiKey: "AIzaSyAwhwT4QgtqwsW5JcFdjWagUtxht55G7D8",
    authDomain: "attendance-5a768.firebaseapp.com",
    projectId: "attendance-5a768",
    storageBucket: "attendance-5a768.appspot.com",
    messagingSenderId: "516655491513",
    appId: "1:516655491513:web:2c2784b4155c6cb8266e68",
    measurementId: "G-FFX5809404"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);