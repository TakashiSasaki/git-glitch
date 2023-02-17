WebAuthn 周りをいじってみる練習。
2022 年 11 月 18 日スタート。

Google Codelab の[webauthn-reauth](https://developers.google.com/codelabs/webauthn-reauth)
という[Glitch プロジェクト](https://glitch.com/edit/#!/webauthn-codelab-start)
をもとに書き直してみる。

webauthn-reauth では Node.js の Express を使っていたが、
最近の Glitch では Fastify を使うのが普通らしい。

Handlebar っていうテンプレートエンジンを使うらしい。
これは webauthn-reauth でも使っていたな。
こういうのを使うのが普通なの？

Express ではテンプレートエンジンを以下のように登録する。

```
const hbs = require('hbs');
const app = express();
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.set('views', './views');
```

Fastify ではテンプレートエンジンを以下のように登録する。

```
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});
```
