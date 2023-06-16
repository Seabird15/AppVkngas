// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {v4} from 'uuid'
import 'firebase/firestore'
import { getFirestore, collection, addDoc } from 'firebase/firestore' // Importa getFirestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxlw7SpE3euCDunFm9va9pgX1vciHIFVs",
  authDomain: "proyecto-firebase-8f590.firebaseapp.com",
  projectId: "proyecto-firebase-8f590",
  storageBucket: "proyecto-firebase-8f590.appspot.com",
  messagingSenderId: "997192972707",
  appId: "1:997192972707:web:52c24f41dd825b07cdc216",
  measurementId: "G-TXHL9ENXP0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)

export async function uploadFile (file) {
  const storageRef = ref(storage, v4())
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}

export const db = getFirestore(app);