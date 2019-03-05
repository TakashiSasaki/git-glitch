// https://qiita.com/OMOIKANESAN/items/3fa9c84b6d388b06e02e
// by @OMOIKANESAN

'use strict';
const processs = require("process");
console.log(process.env["GCM_SERVER_KEY"]);
const push = require('web-push');

const GCM_API_KEY = '**Firebase で調べた API キー**';
push.setGCMAPIKey(GCM_API_KEY);

const data = {
    'endpoint': '**エンドポイントを指定**',
    'userAuth': '**鍵生成に使用する乱数指定**',
    'userPublicKey': '**公開鍵指定**'
};

const pushSubscription = {
    endpoint: data.endpoint,
    keys: {
        auth: data.userAuth,
        p256dh: data.userPublicKey
    }
}

push.sendNotification(pushSubscription,'Hi! How are you?')
    .then(function(result) {
    console.log("success!");
        console.log(result);
    })
    .catch(function(err) {
    console.log("fail!");    
        console.error(err);
    });
