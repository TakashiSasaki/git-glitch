function onBookmarksHtmlLoaded(){
  var uid = localStorage.getItem("firebase-user-uid");
  var ref = firebase.database().ref("/userdata/" + uid + "bookmarks");
  console.log(ref.val());
}