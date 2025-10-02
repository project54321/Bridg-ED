import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { database, auth, ref, push, onValue, remove } from './firebase-init.js';

const addButton = document.getElementById('new-set');
const setContainer = document.getElementById('sets');

onAuthStateChanged(auth, function(user) {
    if (user) {
        const userID = user.uid;
        const setsInDB = ref(database, `${userID}/sets`);


        addButton.addEventListener('click', function() {
        var setName = prompt('Name of your set:');
        // make sure we have a string (avoid objects or accidental values)
        if (setName !== null && setName !== undefined) {
            setName = String(setName).trim();
        }
        if (setName) {
            push(setsInDB, { name: setName });
        }
        });

        onValue(setsInDB, function(snapshot) { //onValue Written, and Debugged with usage of ChatGPT
            setContainer.innerHTML = "";
            if (snapshot.exists()) {
                snapshot.forEach(childSnap => {
                        const data = childSnap.val();
                        const key = childSnap.key;
                        setContainer.appendChild(createSetElement(data && data.name, key));
                    });
            } 
            else {
                setContainer.innerHTML = "No sets have been created yet...";
            }
        });

        function createSetElement(name, key) {
            let set = document.createElement('div');
            set.className = 'set';

            let displayName = document.createElement('div');
            displayName.textContent = name;

            let actions = document.createElement('div');

            let open = document.createElement('button');
            open.textContent = 'Open';
            open.addEventListener('click', function() {
                window.location = 'set.html#' + encodeURIComponent(key); //Chatgpt Used For encodeURIComponent
            });

            let del = document.createElement('button');
            del.textContent = 'Delete';
            del.addEventListener('click', function() {
                if (confirm('Delete set?')) {
                    remove(ref(database, `${userID}/sets/${key}`));
                }
            });

            actions.appendChild(open);
            actions.appendChild(del);
            set.appendChild(displayName);
            set.appendChild(actions);

            return set;
        }
    }
    else {
        window.alert('You must be logged in to view this page');
        window.location = 'login.html';
    }
});
