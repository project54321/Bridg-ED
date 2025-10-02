import { auth, database, ref, push, onValue, remove, update } from './firebase-init.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

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
