import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// REPLACE THIS with your actual keys from the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBDuMw4G-698qIjO4YsNTAbyy-kd-0n2hk",
  authDomain: "crafts-and-kits.firebaseapp.com",
  projectId: "crafts-and-kits",
  storageBucket: "crafts-and-kits.firebasestorage.app",
  messagingSenderId: "985528738329",
  appId: "1:985528738329:web:c93ed3dbce306f6c4e4088",
};


// Initialize Firebase securely (only once)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export the services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);