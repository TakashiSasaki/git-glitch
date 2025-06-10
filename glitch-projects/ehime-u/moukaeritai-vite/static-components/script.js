"use strict";
exports.__esModule = true;
var top_app_bar_1 = require("@material/top-app-bar");
var topAppBar = top_app_bar_1.MDCTopAppBar.attachTo(document.getElementById("app-bar"));
topAppBar.setScrollTarget(document.getElementById("main-content"));
topAppBar.listen("MDCTopAppBar:nav", function () {
    drawer.open = !drawer.open;
});
