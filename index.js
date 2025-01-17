<!DOCTYPE html>
<html>

    <head>
        <title>Hot-and-Cold</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&family=Calistoga&display=swap" rel="stylesheet">
		<link rel="stylesheet" href="index.css">
    </head>

    <body>
        <div class="header">
            <h1 class="title">NeedNotes™</h1>
            <div class="navigation">
            <button class="color-button" id="redBtn"></button>
            <button class="color-button" id="greenBtn"></button>
            <button class="color-button" id="blueBtn"></button>
            <button class="color-button" id="greyBtn"></button>
                <button id="newNote" class="nav-btn">New Note +</button>
                <div class="user-profile">
                    <img id="user-profile-picture" src="assets/images/defaultPic.jpg" alt="User Profile Picture">
                </div>
                <button id="sign-out-btn" class="icon-btn">
                    <img src="assets/icons/logOut.jpg" class="icon-img-btn">
                </button>
            </div>
        </div>
        <section id="logged-out-view">
            <div class="container">
                <h1 class="app-title">Sign Into NeedNotes™</h1>
                
                <div class="provider-buttons">
                    <button id="sign-in-with-google-btn" class="provider-btn">
                        <img src="assets/providers/google.png" class="google-btn-logo">
                        Sign in with Google
                    </button>
                </div>
                
                <div class="auth-fields-and-buttons">
                    <input id="email-input" type="email" placeholder="Email">
                    <input id="password-input" type="password" placeholder="Password">
                    
                    <button id="sign-in-btn" class="primary-btn">Sign in</button>
                    <button id="create-account-btn" class="secondary-btn">Create Account</button>
                </div>
            </div>
        </section>
        
        <section id="logged-in-view">
            <div id="notes-container">

            </div>
            <div class="container" id="postID">
                <div id="post-section">
                    <textarea id="post-input" placeholder="Write some notes..."></textarea>
                    <button id="post-btn" class="primary-btn">Save</button>
                </div>
            </div>
        </section>
        
        <!-- <div class="buttonDiv">
        <br><br><br><br><br><br><br>
            <p>Change Theme</p>
            <button class="color-button" id="redBtn"></button>
            <button class="color-button" id="greenBtn"></button>
            <button class="color-button" id="blueBtn"></button>
            <button class="color-button" id="greyBtn"></button>
        </div> -->
        <script src="index.js" type="module"></script>
    </body>
</html>

    <!--   credit: coursera-->
