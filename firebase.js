import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnUF_q4mBY5Zq4SbWz-wMXq6aTMHPqr0g",
  authDomain: "instagram-clone-30f6c.firebaseapp.com",
  projectId: "instagram-clone-30f6c",
  storageBucket: "instagram-clone-30f6c.appspot.com",
  messagingSenderId: "498863244121",
  appId: "1:498863244121:web:10554d178b57fb7699c248",
  measurementId: "G-8TVL3E6T5S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default app;