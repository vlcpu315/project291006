
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBq_NsQ3l5KdJ-vs7dK5glVM1HQc0NKS6A",
    authDomain: "webapp-afa8f.firebaseapp.com",
    databaseURL: "https://webapp-afa8f.firebaseio.com",
    projectId: "webapp-afa8f",
    storageBucket: "webapp-afa8f.appspot.com",
    messagingSenderId: "189007667783"
};
firebase.initializeApp(config);
var txtEmail = document.getElementById("name");
var txtPassWord = document.getElementById("password");

function SignUp(){
    var email = txtEmail.value;
    var password = txtPassWord.value; 
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);

    });

};

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
		
	var uid=firebaseUser.uid;
	firebase.database().ref('lib').once('value', function(snapshot) {
	firebase.database().ref().child(uid).set(snapshot.val());
	window.location="e-fridge.html";
	});
    }
});

