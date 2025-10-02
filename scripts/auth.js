import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

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
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', function(){
    signInWithPopup(auth, provider)
    .then((result) => {

        const credential = GoogleAuthProvider.credentialFromResult(result);

        const user = result.user;
        console.log(user);
        window.location.href = "./main.html";

    }).catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
    });
});