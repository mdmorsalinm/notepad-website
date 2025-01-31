// MY JS
/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


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

const newNoteButton = document.getElementById("newNote");
const postSection = document.getElementById("post-section");


postSection.style.display = "none";




const saveBtn = document.getElementById("post-btn");
const postInput = document.getElementById("post-input");
const notesContainer = document.getElementById("notes-container")

newNoteButton.addEventListener("click", () => {
    postSection.style.display = postSection.style.display === "none" ? "block" : "none";
});

const renderedPosts = new Set(); 
// **CHANGE END**

/* === Authentication === */
onAuthStateChanged(auth, async (user) => {
    if (user) {
        showLoggedInView();
        console.log(`User logged in: ${user.uid}`);
        notesContainer.innerHTML = ""; 
        renderedPosts.clear(); 

        const postsRef = query(collection(db, "posts"), where("uid", "==", user.uid));

        onSnapshot(postsRef, (querySnapshot) => {
            const newPosts = [];
            querySnapshot.forEach((doc) => {
                const postId = doc.id; 
                const postBody = doc.data().body;

                if (!renderedPosts.has(postId)) {
                    renderedPosts.add(postId); 
                    newPosts.push(postBody); 
                }
            });
            let uniquePosts = [...new Set(newPosts)];

            console.log("New unique posts: ", uniquePosts);

            
                uniquePosts.forEach((postBody) => {
                    createPostBoxes(postBody);
                    console.log("created") 
                });
            
            console.log("running")
        });
        
    } else {
        showLoggedOutView();
        notesContainer.innerHTML = ""; 
        renderedPosts.clear(); 
    }
    
});

// Save Button Listener
saveBtn.addEventListener("click", async () => {
    const user = auth.currentUser;
    const postBody = postInput.value.trim();
    
    if (user && postBody) {
        try {
            // Add a new post to Firestore
            const docRef = await addDoc(collection(db, "posts"), {
                body: postBody,
                uid: user.uid,
                createdAt: serverTimestamp()
            });
            console.log(`Post added with ID: ${docRef.id}`);
            postInput.value = "";
            postSection.style.display = "none";
        } catch (error) {
            console.error("Error adding post: ", error);
        }
    }
    
});


function createPostBoxes(text) {
    let newDiv = document.createElement("div");
    let newP = document.createElement("p");
    newP.innerHTML = text;
    newDiv.setAttribute("class", "post-box");
    newP.setAttribute("class", "post-text");
    newDiv.appendChild(newP);
    notesContainer.appendChild(newDiv);
}


/* == UI - Elements == */
const textareaEl = document.getElementById("post-input")

const userProfilePictureEl = document.getElementById("user-profile-picture")
const signOutButtonEl = document.getElementById("sign-out-btn")

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")




const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")


const blueButton = document.getElementById("blueBtn");
const redButton = document.getElementById("redBtn"); 
const greenButton = document.getElementById("greenBtn"); 
const greyButton = document.getElementById("greyBtn"); 




/* == UI - Event Listeners == */
signOutButtonEl.addEventListener("click", authSignOut)







signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)




signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)


blueButton.addEventListener("click", blueBtnFunc) 
redButton.addEventListener("click", redBtnFunc) 
greenButton.addEventListener("click", greenBtnFunc) 
greyButton.addEventListener("click", greyBtnFunc) 



/* = Functions - Firebase - Authentication = */
function authSignOut() {
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

function authCreateAccountWithEmail() {
    console.log("Sign up with email and password")
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
 



/* = Functions - Firebase - Cloud Firestore = */






async function addPostToDB(postBody, user) {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            body: postBody,
            uid: user.uid,
            createdAt: serverTimestamp()
        });


    } catch (error) {
        console.log("ERROR!");
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
 






















