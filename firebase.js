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
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;    
    document.getElementById("log").value = "Welcome " + user.displayName;
    document.getElementById("email").value = user.email;
    document.getElementById("user_id").value = user.uid;
    document.getElementById("provider_data").value = JSON.stringify(user.providerData);
  } else {
    document.getElementById("log").value 
      = "You are going to logout, bye.";
  }
});
