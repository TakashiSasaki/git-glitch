function onSaveClick(button){
  var defaultDatabase = firebase.database();
  var key = document.getElementById("key").value;
  var ref = firebase.database().ref(key);
}