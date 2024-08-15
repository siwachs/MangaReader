import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "m-reader-web-app.firebaseapp.com",
  projectId: "m-reader-web-app",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "136849294341",
  appId: process.env.FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
