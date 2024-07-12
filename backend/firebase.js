import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApn_cVwTywoz_t8iijuIlNAdd1URa9Pz4",
  authDomain: "login-auth-964e0.firebaseapp.com",
  projectId: "login-auth-964e0",
  storageBucket: "login-auth-964e0.appspot.com",
  messagingSenderId: "26843363494",
  appId: "1:26843363494:web:0c213f1153c0df97749c67"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
