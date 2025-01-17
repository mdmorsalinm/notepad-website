// MY JS
/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";






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




const saveBtn = document.getElementById("post-btn");
const postInput = document.getElementById("post-input");
const notesContainer = document.getElementById("notes-container")

// Toggle post section visibility
newNoteButton.addEventListener("click", () => {
    postSection.style.display = postSection.style.display === "none" ? "block" : "none";
});

// Track rendered posts to prevent duplication **CHANGE START**
const renderedPosts = new Set(); // Keeps track of displayed posts
// **CHANGE END**

/* === Authentication === */
onAuthStateChanged(auth, async (user) => {
    if (user) {
        showLoggedInView();
        console.log(`User logged in: ${user.uid}`);

        // Clear existing posts and reset tracking
        notesContainer.innerHTML = ""; // Clear all posts from the UI
        renderedPosts.clear(); // Reset the tracking Set

        // Query to fetch posts for the logged-in user
        const postsRef = query(collection(db, "posts"), where("uid", "==", user.uid));

        // Real-time listener for changes in Firestore
        onSnapshot(postsRef, (querySnapshot) => {
            const newPosts = [];
            querySnapshot.forEach((doc) => {
                const postId = doc.id; // Unique ID for the post
                const postBody = doc.data().body;

                // Add only new posts to the array
                if (!renderedPosts.has(postId)) {
                    renderedPosts.add(postId); // Mark post as rendered
                    newPosts.push(postBody); // Add post to render queue
                }
            });
            let uniquePosts = [...new Set(newPosts)];
            // Ensure posts are unique and render them
            console.log("New unique posts: ", uniquePosts);

            // Render all new posts at once to minimize DOM updates
            uniquePosts.forEach((postBody) => {
                createPostBoxes(postBody); // Render post on the page
            });
        });
    } else {
        showLoggedOutView();
        notesContainer.innerHTML = ""; // Clear posts on logout
        renderedPosts.clear(); // Reset the tracking Set
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

            // Optionally, manually trigger the re-query of posts or force a UI refresh
            // After adding the post, Firestore's real-time listener should automatically pick it up.
            // You can reset the input and hide the post section after saving
            postInput.value = "";
            postSection.style.display = "none";
        } catch (error) {
            console.error("Error adding post: ", error);
        }
    }
    
});





// Filter posts by UID
// const querySnapshot = await getDocs(query(collection(db, "posts"), where("uid", "==", user.uid)));


// querySnapshot.forEach((doc) => {
// createPostBoxes(`${doc.data().body}`);
// console.log(`${doc.data().uid}`);  // Optional for debugging
// });








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
    const postBody = textareaEl.value;
    const user = auth.currentUser;
   
    // Call the function to add the post
    if (postBody) {
        addPostToDB(postBody, user);  // Add the post to the database
        // clearInputField(textareaEl);  // Clear the input field after posting
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
 


function generateWord() { fetch('https://random-word-api.herokuapp.com/word')
    .then(response => response.json())
    .then(data => { document.getElementById("randomWord").innerText = data[0]; })
     .catch(error => { console.error('Error fetching the word:', error); });
}
//credit: coursera
//get userID of person logged in
//check if every note
//display flex; flex wrap





















