import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_firebaseAPI,
  authDomain: "m-reader-web-app.firebaseapp.com",
  projectId: "m-reader-web-app",
  storageBucket: "m-reader-web-app.appspot.com",
  messagingSenderId: "136849294341",
  appId: "1:136849294341:web:6f089adf5ba8a84f1a886c",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const storage = getStorage(app);

export default storage;
