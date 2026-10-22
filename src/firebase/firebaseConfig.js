import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCLKQlCGn4yClPSNhjc_KMuH7IwOlNEayc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dist-7b242.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dist-7b242",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dist-7b242.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "388425511194",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:388425511194:web:510bb43395780f86cebca3"
};

let app, db, auth, storage;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
} catch (error) {
  console.error("Firebase Initialization Error:", error);
}

export { db, auth, storage };
export default app;
