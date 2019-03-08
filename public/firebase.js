// Firebaseへの接続に必要なAPIキーその他の情報は
// Firebaseコンソールから取得する
// Androidアプリケーションでは google-services.json に相当する
// apiKeyが露出しているのは仕方ない。
// いわゆるクライアントシークレットが露出しているわけではない。
// ".read":true, ".write":true みたいな設定しちゃだめ。

var config = {
  apiKey: "AIzaSyA3HkRw5Sd8QexcQKea1fMCKE8pDxcS514",
  authDomain: "dashboard-52fd5.firebaseapp.com",
  databaseURL: "https://dashboard-52fd5.firebaseio.com",
  projectId: "dashboard-52fd5",
  storageBucket: "dashboard-52fd5.appspot.com",
  messagingSenderId: "920406529480"
};

//firebaseオブジェクトは index.html の script タグ
//<script src="https://www.gstatic.com/firebasejs/5.8.0/firebase.js"></script>
//で読み込まれていることを前提としているので、
//このファイル firebase.js はそれよりも後に読み込むこと。
firebase.initializeApp(config);

firebase.database().ref("message").on('value', function(data_snapshot){
  console.log(data_snapshot);
  document.getElementById("key").value = "message";
  document.getElementById("value").value = data_snapshot.val();
});


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    updateAuthState(user);
  } else {
    document.getElementById("log").value 
      = "You are going to logout, bye.";
  }
});

function updateAuthState(user){
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;    
    document.getElementById("log").value = "Welcome " + user.displayName;
    document.getElementById("email").value = user.email;
    document.getElementById("user_id").value = user.uid;
    document.getElementById("provider_data").value = JSON.stringify(user.providerData);
}

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  document.getElementById("firebase-auth-token").value = token;
  // The signed-in user info.
  var user = result.user;
  document.getElementById("firebase-auth-user").value = JSON.stringify(user);
  // ...
}).catch(function(error) {
  document.getElementById("firebase-error-code").value = error.code;
  document.getElementById("firebase-error-message").value = error.message;
  document.getElementById("firebase-error-email").value = error.email;
  document.getElementById("firebase-error-credential").value = error.credential;
});

firebase.auth().onAuthStateChanged(function(user){
  if(user){
    document.getElementById("firebase-user-email-verified").value = user.emailVerified;
    document.getElementById("firebase-user-is-anonymous").value = user.isAnonymous;
    document.getElementById("firebase-user-photo-url").value = user.photoURL;
    document.getElementById("firebase-user-email").value = user.email
    localStorage.setItem("firebase-user-email", user.email);
    document.getElementById("firebase-user-uid").value = user.uid
    localStorage.setItem("firebase-user-uid", user.uid);
    document.getElementById("firebase-user-provider-data").value = JSON.stringify(user.providerData);
    document.getElementById("firebase-user-display-name").value = user.displayName;
  } else {
    document.getElementById("firebase-user-email-verified").value = "";
    document.getElementById("firebase-user-is-anonymous").value = "";
    document.getElementById("firebase-user-photo-url").value = "";
    document.getElementById("firebase-user-email").value = "";
    document.getElementById("firebase-user-uid").value = "";
    document.getElementById("firebase-user-provider-data").value = "";
    document.getElementById("firebase-user-display-name").value = "";
  }
});