import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC0rQy_Nep0tbidMo3eEy1JHMMC1k0CH7I",
    authDomain: "quanlithanhvien-21464.firebaseapp.com",
    projectId: "quanlithanhvien-21464",
    storageBucket: "quanlithanhvien-21464.appspot.com",
    messagingSenderId: "942377887275",
    appId: "1:942377887275:web:8ebaa82f4fecd8ab6b2c6e",
    measurementId: "G-9EE56ECQH8"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
