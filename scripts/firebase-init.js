import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAYlSBn9icqtUu_Bc64sMl8tqRZmCv_nZ0",
  authDomain: "bridged-bfc67.firebaseapp.com",
  databaseURL: "https://bridged-bfc67-default-rtdb.firebaseio.com",
  projectId: "bridged-bfc67",
  storageBucket: "bridged-bfc67.firebasestorage.app",
  messagingSenderId: "1015882297125",
  appId: "1:1015882297125:web:25394c80e072c24f61f4cc",
  measurementId: "G-RZXGGR3FF8"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth, ref, push, onValue, remove, update };
