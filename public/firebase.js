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
