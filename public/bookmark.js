function onBookmarkHtmlLoaded(){
  var uid = localStorage.getItem("firebase-user-uid");
  console.log(uid);
  var ref = firebase.database().ref("/userdata/" + uid + "/bookmarks");
  console.log(ref.val);
  ref.set([]);
}