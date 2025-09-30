//Firebase Documentation used in the development of this project: https://firebase.google.com/docs/reference/js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

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

let title = document.getElementById('set-title'); title.textContent = "Study Set";
let cardsDiv = document.getElementById('cards');
let addButton = document.getElementById('add-card');
let backButton = document.getElementById('back');
let studyButton = document.getElementById('study');


let setID = decodeURIComponent(location.hash.replace('#','')) || 'Untitled';

onAuthStateChanged(auth, function(user) {
    if(!user){
        alert("You must be logged in to view this page");
        window.location = "login.html";
        return;
    }

    const userID = user.uid;
    const termsInDB = ref(database, `${userID}/sets/${setID}/cards`);


    onValue(termsInDB, snapshot => { //ChatGPT Used to Write and Debug onValue
        cardsDiv.innerHTML = '';
        if(snapshot.exists()){
            snapshot.forEach(childSnap => {
                const data = childSnap.val();
                const key = childSnap.key;
                cardsDiv.appendChild(createFlashcardElement(data, key));
            });
        }
    });

    addButton.addEventListener('click', () => {
        push(termsInDB, { input:'', output:'' }); 
    });

    function createFlashcardElement(data, key){
        const row = document.createElement('div');
        row.className = 'card-row';

        const input = document.createElement('input');
        input.value = data.input;
        input.placeholder = "Front (term)";
        input.addEventListener('change', () => {
            update(ref(database, `${userID}/sets/${setID}/cards/${key}`), { input: input.value });
        });

        const out = document.createElement('input');
        out.value = data.output;
        out.placeholder = "Back (definition)";
        out.addEventListener('change', () => {
            update(ref(database, `${userID}/sets/${setID}/cards/${key}`), { output: out.value });
        });

        const del = document.createElement('button');
        del.textContent = 'Delete';
        del.addEventListener('click', () => {
            if(confirm("Delete this flashcard?")){
                remove(ref(database, `${userID}/sets/${setID}/${key}`));
            }
        });

        row.appendChild(input);
        row.appendChild(out);
        row.appendChild(del);

        return row;
    }

    backButton.addEventListener('click', () => {
        window.location = 'main.html';
    });

    studyButton.addEventListener('click', () => {
        localStorage.setItem('study_set', setID);
        window.location = 'study.html';
    });
});
