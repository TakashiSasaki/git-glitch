function onSaveClick(button){
  var defaultDatabase = firebase.database();
  var key = document.getElementById("key").value;
  var ref = firebase.database().ref(key);
  var value = document.getElementById("value").value;
  ref.set(value);
  document.getElementById("log").value = "onSaveClick done";
}
