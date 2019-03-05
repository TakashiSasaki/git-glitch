//サービスワーカー sw.js を登録する
//index.html において script タグでこのファイル pwa.js を読み込みむ。
//ChromeでF12キーを押下して開く Chrome Dev Tools などで確認する。
//navigator.serviceWorker.register('/sw.js').then(function() {
//  console.log('サービスワーカー登録成功');
//}).catch(function(err) {
//  console.log('サービスワーカー登録失敗', err);
//});

window.addEventListener('load', function() {
  if ('serviceWorker' in navigator) {
    console.log("registering service worker /sw.js .");
    navigator.serviceWorker.register("/sw.js");
    console.log("service worker has been registered.");
    navigator.serviceworker.ready.then(function(registration){
      console.log('getting subscription ... ');
      return registration.pushManager.subscribe({userVisibleOnly: true});
    }).then(function(subscription){
      localStorage.setItem("GCM_ENDPOINT", subscription.endpoint);
      console.log("GCM endpoint : " + subscription.endpoint);
      var auth = btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth'))));
      localStorage.setItem("auth", auth);
      
    }).catch(function(e){
      console.log(e);
    });
  } else {
    console.log("This browser does not support service worker.");
    return;
  }
  
});//addEventListener
