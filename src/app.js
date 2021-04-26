"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scrapper_1 = require("./logic/scrapper");
var App = /** @class */ (function () {
    function App() {
    }
    App.start = function () {
        scrapper_1.scrap();
    };
    return App;
}());
App.start();
