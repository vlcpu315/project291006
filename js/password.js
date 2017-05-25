var config = {
    apiKey: "AIzaSyBq_NsQ3l5KdJ-vs7dK5glVM1HQc0NKS6A",
    authDomain: "webapp-afa8f.firebaseapp.com",
    databaseURL: "https://webapp-afa8f.firebaseio.com",
    projectId: "webapp-afa8f",
    storageBucket: "webapp-afa8f.appspot.com",
    messagingSenderId: "189007667783"
};
firebase.initializeApp(config);
function changePW(){
    var auth = firebase.auth();
    var user = firebase.auth().currentUser;
    var email = user.email;
    auth.sendPasswordResetEmail(email).then(function() {
       window.location="#listpage";
    }, function(error) {
       
    });
}