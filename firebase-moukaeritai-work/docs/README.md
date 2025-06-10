# firebase-moukaeritai-work

このプロジェクトを Firebase にデプロイしてマルチドメインで使うつもり。
npm firebase-tools しなければならないので、glitch-hello-node からのフォークを選んだ。

# Firebase Toolsの導入
Glitchの仮想マシンに[Firebase Tools](https://www.npmjs.com/package/firebase-tools)を導入する。

```
$ npm update npm
$ npm update`
$ npm install firebase-tools
$ firebase login --no-localhost
$ refresh
```

ターミナルから直接インストールした npm パッケージは放っておくと次のログイン時には消えてしまっていた。
コンテナが毎度新しく作り直されるかららしい。どないしたらええねん？

コマンドラインから npm でインストールするのではなく package.json に追加すればいいのかもしれない。
<img src="https://cdn.glitch.global/c1a42e05-227b-4feb-af43-a29f603f6fe4/a6c2508b-b23a-4d0b-b40e-1ad7a73d2325.image.png?v=1659500465919">

firebase-tools のトークンなど各種設定は.config/configstore/以下に保存される。
<img src="https://cdn.glitch.global/c1a42e05-227b-4feb-af43-a29f603f6fe4/12bfc221-3e94-4efa-8097-6a04f6b651ac.image.png?v=1659501322707">
`.config`は`/etc/git/gitignore-global`
に含まれているのでコミット対象では無い。
毎回`firebase login --reauth --no-localhost`
しなければならないかもしれないが、`firebase-tools.json`
にはアクセストークンも含まれているので安全のためには致し方ない。

```
$ firebase init hosting
```

Create a new project を選んでみる。
<img src="https://cdn.glitch.global/c1a42e05-227b-4feb-af43-a29f603f6fe4/eb0fb1d1-55f2-494b-985a-b6310df9c0ce.image.png?v=1659502009635">
この「Create a new project」というのは Google Cloud 　 Platform のプロジェクトのことらしい。
新しく GCP のプロジェクトが作成された。
<img src="https://cdn.glitch.global/c1a42e05-227b-4feb-af43-a29f603f6fe4/2a086602-42cd-4232-830b-8ea441a8fb8b.image.png?v=1659502351249">

SPA としてデプロイする選択をすると URL のパス部分が常に`index.html`に書き換えられる。
<img src="https://cdn.glitch.global/c1a42e05-227b-4feb-af43-a29f603f6fe4/7ed42fe8-f689-4ccd-b9c0-a67f8ef2a346.image.png?v=1659503188839">

4 つのファイルが生成された。
<img src="https://cdn.glitch.global/c1a42e05-227b-4feb-af43-a29f603f6fe4/9625734f-c41d-4c56-8e04-8dedaefa7a06.image.png?v=1659503309421">
生成されたファイルはすぐに IDE に反映されるわけではないが、
ターミナルで`refresh`コマンドを実行すると IDE に反映される。
そのうちチェックポイントとして git リポジトリにも記録される。
<img src="https://cdn.glitch.global/c1a42e05-227b-4feb-af43-a29f603f6fe4/5aa49b92-6254-4bd8-8d13-22b9c938b38c.image.png?v=1659505173553">


## Firebase Console での確認






This project includes a Node.js server script and a web page that connects to it. The front-end page presents a form the visitor can use to submit a color name, sending the submitted value to the back-end API running on the server. The server returns info to the page that allows it to update the display with the chosen color. 🎨

[Node.js](https://nodejs.org/en/about/) is a popular runtime that lets you run server-side JavaScript. This project uses the [Fastify](https://www.fastify.io/) framework and explores basic templating with [Handlebars](https://handlebarsjs.com/).




## Prerequisites

You'll get best use out of this project if you're familiar with basic JavaScript. If you've written JavaScript for client-side web pages this is a little different because it uses server-side JS, but the syntax is the same!

## What's in this project?

← `README.md`: That’s this file, where you can tell people what your cool website does and how you built it.

← `public/style.css`: The styling rules for the pages in your site.

← `server.js`: The **Node.js** server script for your new site. The JavaScript defines the endpoints in the site back-end, one to return the homepage and one to update with the submitted color. Each one sends data to a Handlebars template which builds these parameter values into the web page the visitor sees.

← `package.json`: The NPM packages for your project's dependencies.

← `src/`: This folder holds the site template along with some basic data files.

← `src/pages/index.hbs`: This is the main page template for your site. The template receives parameters from the server script, which it includes in the page HTML. The page sends the user submitted color value in the body of a request, or as a query parameter to choose a random color.

← `src/colors.json`: A collection of CSS color names. We use this in the server script to pick a random color, and to match searches against color names.

← `src/seo.json`: When you're ready to share your new site or add a custom domain, change SEO/meta settings in here.

## Try this next 🏗️

Take a look in `TODO.md` for next steps you can try out in your new site!

**_Want a minimal version of this project to build your own Node.js app? Check out [Blank Node](https://glitch.com/edit/#!/remix/glitch-blank-node)!_**

![Glitch](https://cdn.glitch.com/a9975ea6-8949-4bab-addb-8a95021dc2da%2FLogo_Color.svg?v=1602781328576)

## You built this with Glitch!

[Glitch](https://glitch.com) is a friendly community where millions of people come together to build web apps and websites.

- Need more help? [Check out our Help Center](https://help.glitch.com/) for answers to any common questions.
- Ready to make it official? [Become a paid Glitch member](https://glitch.com/pricing) to boost your app with private sharing, more storage and memory, domains and more.
