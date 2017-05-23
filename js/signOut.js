
var config = {
    apiKey: "AIzaSyBq_NsQ3l5KdJ-vs7dK5glVM1HQc0NKS6A",
    authDomain: "webapp-afa8f.firebaseapp.com",
    databaseURL: "https://webapp-afa8f.firebaseio.com",
    projectId: "webapp-afa8f",
    storageBucket: "webapp-afa8f.appspot.com",
    messagingSenderId: "189007667783"
};
firebase.initializeApp(config);
function FBSignIn() {
    var provider = new firebase.auth.FacebookAuthProvider(); 
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(token);
        console.log(user);
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
        };
    });
}
function SignIn(){
    var email = document.getElementById("name1").value;
    var password = document.getElementById("password1").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
}                                   
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        window.location="e-fridge.html";
    }
});