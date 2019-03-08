function onPasswordHtmlLoaded(){
  document.getElementById("buttonCreateUser").addEventListener("click", function(){
    var email = document.getElementById("firebase-user-email").value;
    var password = document.getElementById("firebase-user-password").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(x){
      document.getElementById("firebase-log").value = JSON.stringify(x);
      updateAuthState(x.user);
    }).catch(function(error) {
      var errorCode = error.code;
      document.getElementById("log").value = error.message;
      console.log(error);
    });  
  });
  
  doument.getElementById("buttonLogin").addEventListener("click", function(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(x){
      document.getElementById("log").value = JSON.stringify(x);
      updateAuthState(x.user);
    }).catch(function(error) {
      var errorCode = error.code;
      document.getElementById("log").value = error.message;
    });
  });  
  
  document.getElementById("buttonLogout").addEventListener("click", function(){
    firebase.auth().signOut().then(function(x){
      document.getElementById("log").value = JSON.stringify(x);
      if(x) updateAuthState(x.user);
    });
  });
}//onPasswordHtmlLoaded()
