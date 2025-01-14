/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { collection, addDoc, serverTimestamp, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";



// Initialize Cloud Firestore and get a reference to the service





/* === Firebase Setup === */

const firebaseConfig = {
    apiKey: "AIzaSyAyhDHTCHo_vl3QHfLASXFL9tA_8qemJhg",
    authDomain: "neednotes-635a1.firebaseapp.com",
    databaseURL: "https://neednotes-635a1-default-rtdb.firebaseio.com",
    projectId: "neednotes-635a1",
    storageBucket: "neednotes-635a1.firebasestorage.app",
    messagingSenderId: "942303548719",
    appId: "1:942303548719:web:bb08dc41596efcc4e43dda"
  };
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
console.log(auth)


console.log(app._options.projectId)
const db = getFirestore(app);

// test if it works
console.log(db)


// app features new notes

const newNoteButton = document.getElementById("newNote");
const postSection = document.getElementById("post-section");

postSection.style.display = "none";

newNoteButton.addEventListener("click", () => {
    if (postSection.style.display === "none") {
        postSection.style.display = "block";
    } else {
        postSection.style.display = "none";
    }
});

const saveBtn = document.getElementById("post-btn");
const postInput = document.getElementById("post-input");
const notesContainer = document.getElementById("notes-container")

saveBtn.addEventListener("click", () => {
    postSection.style.display = "none";
});


const querySnapshot = await getDocs(collection(db, "posts"));
querySnapshot.forEach((doc) => {
  createPostBoxes(`${doc.data().body}`);
});



function createPostBoxes(text) {
    let newDiv = document.createElement("div");
    let newP = document.createElement("p");
    newDiv.setAttribute("class", "post-box");
    newP.setAttribute("class", "post-text");
    newDiv.appendChild(newP);
    notesContainer.appendChild(newDiv);
    newP.innerHTML = text;
}

/* === UI === */


/* == UI - Elements == */
const textareaEl = document.getElementById("post-input")
const postButtonEl = document.getElementById("post-btn")

const userGreetingEl = document.getElementById("user-greeting")


const userProfilePictureEl = document.getElementById("user-profile-picture")
const signOutButtonEl = document.getElementById("sign-out-btn")



const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")


const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")


const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")


const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

const blueButton = document.getElementById("blueBtn"); ////////////
const redButton = document.getElementById("redBtn"); ////////////
const greenButton = document.getElementById("greenBtn"); ////////////
const greyButton = document.getElementById("greyBtn"); ////////////


/* == UI - Event Listeners == */
signOutButtonEl.addEventListener("click", authSignOut)

postButtonEl.addEventListener("click", postButtonPressed)


signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)


signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

blueButton.addEventListener("click", blueBtnFunc) ////////
redButton.addEventListener("click", redBtnFunc) ////////
greenButton.addEventListener("click", greenBtnFunc) ////////
greyButton.addEventListener("click", greyBtnFunc) ////////

/* === Main Code === */
// showLoggedOutView()

/*  Challenge:
    Import the onAuthStateChanged function from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
    Use the code from the documentation to make this work.
    Use onAuthStateChanged to:
    Show the logged in view when the user is logged in using showLoggedInView()
    Show the logged out view when the user is logged out using showLoggedOutView()
*/
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      showLoggedInView();
      
      // Pass the actual img element and the user object
      console.log(user.photoURL);
      showUserGreeting(userGreetingEl, user)
      showProfilePicture(userProfilePictureEl, user); 
    } else {
      // User is signed out
      showLoggedOutView();
    }
});


/* === Functions === */


/* = Functions - Firebase - Authentication = */
function authSignOut() {
    /*  Challenge:
         Import the signOut function from 'firebase/auth'
 
 
        Use the code from the documentation to make this function work.
   
        If the log out is successful then you should show the logged out view using showLoggedOutView()
        If something went wrong, then you should log the error message using console.error.
    */
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          showLoggedOutView()
        }).catch((error) => {
        console.error;
        });
}
function authSignInWithGoogle() {
    console.log("Sign in with Google")
}


function authSignInWithEmail() {
    console.log("Sign in with email and password")




    const email = emailInputEl.value
    const password = passwordInputEl.value
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      showLoggedInView()
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });


}
///////////////////
function authCreateAccountWithEmail() {
    console.log("Sign up with email and password")
        /*  Challenge:
    1 Import the createUserWithEmailAndPassword function from from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";




       2 Use the code from the documentation to make this function work.
       3 Make sure to first create two consts, 'email' and 'password', to fetch the values from the input fields emailInputEl and passwordInputEl.
       4 If the creation of user is successful then you should show the logged in view using showLoggedInView()
       5 If something went wrong, then you should log the error message using console.error.
    */


       const email = emailInputEl.value
       const password= passwordInputEl.value
       createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up
    showLoggedInView()
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("errorMessage")
    // ..
  });
   
}




/* == Functions - UI Functions == */
function showProfilePicture(imgElement, user) {
    if (imgElement) {
        if (user.photoURL) {
            imgElement.src = user.photoURL;  
        } else {
            imgElement.src = "assets/images/defaultPic.jpg"; 
        }
    } else {
        console.error("Image element is not available.");
    }
}


function postButtonPressed() {
    const postBody = textareaEl.value
    const user = auth.currentUser
    
    // Call the function to add the post
    addPostToDB(postBody, user);
    
    if (postBody) {
        addPostToDB(postBody)
        clearInputField(textareaEl)
    }
 }
 

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
 }
 


 function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
 }
 


 function showView(view) {
    view.style.display = "flex"
 }
 


 function hideView(view) {
    view.style.display = "none"
 }
 

 function showUserGreeting(element, user) {
    if (user.displayName) {
        element.textContent = `Hi ${user.displayName}`;
    } else {
        element.textContent = "Hey friend, how are you?";
    }
}

/* = Functions - Firebase - Cloud Firestore = */



async function addPostToDB(postBody, user) {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            body: postBody,
            uid: user.uid,
            createdAt: serverTimestamp()
        });

    } catch (error) {
        console.error(error);
    }
}


function blueBtnFunc(){
    document.body.style.backgroundColor = 'rgb(93, 149, 252)';
document.body.style.backgroundImage = 'none'; 
    console.log("HIII")
}
function redBtnFunc(){
    document.body.style.backgroundColor = 'rgb(255, 106, 61)';
document.body.style.backgroundImage = 'none'; 
    console.log("HIII")
}
function greenBtnFunc(){
    document.body.style.backgroundColor = 'rgb(107, 226, 113)';
document.body.style.backgroundImage = 'none'; 
    console.log("HIII")
}
function greyBtnFunc(){
    document.body.style.backgroundColor = 'rgb(78, 78, 78)';
document.body.style.backgroundImage = 'none'; 
    console.log("HIII")
}
 
//credit: coursera
