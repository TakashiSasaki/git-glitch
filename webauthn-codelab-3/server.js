/*
 * @license
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */

// init project
const express = require("express");
const session = require("express-session");
const hbs = require("hbs");
const auth = require("./libs/auth");
const app = express();

app.set("view engine", "html");
app.engine("html", hbs.__express);
app.set("views", "./views");
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("my"));
app.use(express.static("dist"));
app.use(
  session({
    secret: "secret", // You should specify a real secret here
    resave: true,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  })
);

app.use((req, res, next) => {
  if (process.env.PROJECT_DOMAIN) {
    process.env.HOSTNAME = `${process.env.PROJECT_DOMAIN}.glitch.me`;
  } else {
    process.env.HOSTNAME = req.headers.host;
  }
  const protocol = /^localhost/.test(process.env.HOSTNAME) ? "http" : "https";
  process.env.ORIGIN = `${protocol}://${process.env.HOSTNAME}`;
  if (
    req.get("x-forwarded-proto") &&
    req.get("x-forwarded-proto").split(",")[0] !== "https"
  ) {
    return res.redirect(301, process.env.ORIGIN);
  }
  req.schema = "https";
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  // Check session
  if (req.session.username) {
    // If user is signed in, redirect to `/reauth`.
    res.redirect(307, "/reauth");
    return;
  }
  // If user is not signed in, show `index.html` with id/password form.
  res.render("index.html");
});

app.get("/home", (req, res) => {
  if (!req.session.username || req.session["signed-in"] != "yes") {
    // If user is not signed in, redirect to `/`.
    res.redirect(307, "/");
    return;
  }
  // `home.html` shows sign-out link
  res.render("home.html", { username: req.session.username });
});

app.get("/reauth", (req, res) => {
  const username = req.session.username;
  if (!username) {
    res.redirect(302, "/");
    return;
  }
  // Show `reauth.html`.
  // User is supposed to enter a password (which will be ignored)
  // Make XHR POST to `/signin`
  res.render("reauth.html", { username: username });
});

app.get("/.well-known/assetlinks.json", (req, res) => {
  const assetlinks = [];
  const relation = [
    "delegate_permission/common.handle_all_urls",
    "delegate_permission/common.get_login_creds",
  ];
  assetlinks.push({
    relation: relation,
    target: {
      namespace: "web",
      site: process.env.ORIGIN,
    },
  });
  if (process.env.ANDROID_PACKAGENAME && process.env.ANDROID_SHA256HASH) {
    assetlinks.push({
      relation: relation,
      target: {
        namespace: "android_app",
        package_name: process.env.ANDROID_PACKAGENAME,
        sha256_cert_fingerprints: [process.env.ANDROID_SHA256HASH],
      },
    });
  }
  res.json(assetlinks);
});

app.use("/auth", auth);

// listen for req :)
const port = process.env.GLITCH_DEBUGGER ? null : 8080;
const listener = app.listen(port || process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
