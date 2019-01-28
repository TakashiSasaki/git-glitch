function onSaveClick(button){
  var defaultDatabase = firebase.database();
  var key = document.getElementById("key").value;
  var ref = firebase.database().ref(key);
  var value = document.getElementById("value").value;
  ref.set(value);
  document.getElementById("log").value = "onSaveClick done";
}

function onCreateUserClick(button){
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    document.getElementById("log").value =errorMesasge;
    console.log(error);
  });  
}

function onLoginClick(button){
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
    // Handle Errors here.
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

function onLogoutClick(button){
}

function onDeleteUserClick(button){
}
