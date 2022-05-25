const firebaseConfig = {
    apiKey: "AIzaSyDld23aIsp7MzjlOtizQhkruqQehi0QjyI",
    authDomain: "blog-2022-9918b.firebaseapp.com",
    projectId: "blog-2022-9918b",
    storageBucket: "blog-2022-9918b.appspot.com",
    messagingSenderId: "20446337411",
    appId: "1:20446337411:web:224200055bb86b136b3eb6",
    measurementId: "G-0CH4HC59HE"
};

function mobileMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "") {
        x.className = "mobile";
    } else {
        x.className = "";
    }
}

const yearElement = document.getElementById('year');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const postareBtn = document.getElementById('postare-btn');
const salutare = document.getElementById('username');

let user = null;
let admins = ["1HGrtdN9SsbWOWQ4AZcM7iaHvLU2"];

// setam bazele firebase, ne conectam la serviciu
firebase.initializeApp(firebaseConfig);

// referinta la serviciul de autentificare
const auth = firebase.auth();

// referinta la baza de date
const db = firebase.firestore();

//referinta la colectie de postari din BD
const postariDb = db.collection('postari');

// alegem providerul de logare -> Google
const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.onclick = function() {
    console.log("logare...");
    auth.signInWithPopup(provider).then(function() { window.location.reload(); });
}

logoutBtn.onclick = function() {
    auth.signOut();
    window.location.reload();
}

function isAdmin() {
    let admin;

    if (user == null)
        return false;
    
    admin = admins.includes(user.uid); // true or false

    return admin;
}


function formatDate(time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let result = day + "-" + month + "-" + year;

    return result; 
}


auth.onAuthStateChanged(function(fuser) {
    user = fuser;
    console.log(user);
    if (user != null) {
        // logat in sistem
        logoutBtn.style.display = "block";
        loginBtn.style.display = "none";

        salutare.innerHTML = "Salutare, " +  user.displayName;

        if (isAdmin() == true) {
            postareBtn.style.display = 'block';
        }
        else {
            postareBtn.style.display = 'none';
        }
    }
    else {
        // nu e logat in sistem
        logoutBtn.style.display = "none";
        loginBtn.style.display = "block";
        postareBtn.style.display = 'none';
    }

    document.querySelector('body').style.display = "block";
})


if (yearElement) {
    let date = new Date();
    
    yearElement.innerHTML = date.getFullYear() + " ©";
}

