import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import firebase from 'firebase/compat/app'
const firebaseConfig = {
    apiKey: "AIzaSyDew-TKwfdIO3q1sZ4P-1BlVVelVktDTfo",
    authDomain: "movie-review-a4dd2.firebaseapp.com",
    projectId: "movie-review-a4dd2",
    storageBucket: "movie-review-a4dd2.appspot.com",
    messagingSenderId: "329380250954",
    appId: "1:329380250954:web:f96d0d6d8c41b830706db3",
    measurementId: "G-M31YBM5RD0"
};

const app = initializeApp(firebaseConfig);
//export const firestore = firebase.firestore();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();