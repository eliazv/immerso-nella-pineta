import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getMessaging, isSupported } from "firebase/messaging";

// Configurazione Firebase - Sostituisci con le tue credenziali
const firebaseConfig = {
  apiKey: "AIzaSyAg1cYDCZ6lTiKi33rB10fpqCx81bC52QQ",
  authDomain: "immerso-34705.firebaseapp.com",
  projectId: "immerso-34705",
  storageBucket: "immerso-34705.firebasestorage.app",
  messagingSenderId: "146887354488",
  appId: "1:146887354488:web:52b513f52930999db6e58d",
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Inizializza Firestore
export const db = getFirestore(app);

// Inizializza Auth
export const auth = getAuth(app);

// Inizializza Messaging (per le notifiche push)
export const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export default app;
