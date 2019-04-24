var originalSetItem = localStorage.setItem;

localStorage.setItem = function(k,v) {
  var event = new Event('setItem');
  event
  document.dispatchEvent(event);
originalSetItem.apply(this, arguments);
}
