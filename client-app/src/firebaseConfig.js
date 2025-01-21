// src/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBgZQ1SpB_ioQLb0X4zFGpfulR9EOpyYO0",
    authDomain: "recetas-comidas.firebaseapp.com",
    projectId: "recetas-comidas",
    storageBucket: "recetas-comidas.firebasestorage.app",
    messagingSenderId: "201413909427",
    appId: "1:201413909427:web:c950cb1eaf31cec94ec9c6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
