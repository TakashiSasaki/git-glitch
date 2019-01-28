// Firebaseへの接続に必要なAPIキーその他の情報
// Firebaseコンソールから取得する
// Androidアプリケーションでは google-services.json に相当する
var config = {
  apiKey: "AIzaSyB-ewVL2KK1odHdDKgNg9GbywQGQQPdBJc",
  authDomain: "fir-realtimedatabasesamp-11e1f.firebaseapp.com",
  databaseURL: "https://fir-realtimedatabasesamp-11e1f.firebaseio.com",
  projectId: "fir-realtimedatabasesamp-11e1f",
  storageBucket: "fir-realtimedatabasesamp-11e1f.appspot.com",
  messagingSenderId: "784350157671"
};
//firebaseオブジェクトは index.html の script タグ
//<script src="https://www.gstatic.com/firebasejs/5.8.0/firebase.js"></script>
//で読み込まれていることを前提としているので、
//このファイル script.js はそれよりも後に読み込むこと。
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    
    alert("Welcome " + user.email);
    // ...
  } else {
    alert("You are going to logout, bye.");
    // User is signed out.
    // ...
  }
});


function onLoginButtonClick(){
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    document.getElementById('quickstart-sign-in').disabled = false;
    // [END_EXCLUDE]
  });
  // [END authwithemail]
}