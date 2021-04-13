"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var node_fetch_1 = require("node-fetch");
var cheerioModule = require("cheerio");
var sites = require("../inputs/sites.json");
var selectors = require("../inputs/selectors.json");
var _a = require("../inputs/configs.json"), resourcePath = _a.resourcePath, useBrowserRender = _a.useBrowserRender;
var puppeteer = require("puppeteer");
var selectorsMap = new Map();
var sitesMap = new Map();
sites.map(function (site) {
    sitesMap.set(site, []);
});
selectors.map(function (selector) {
    selectorsMap.set(selector, 0);
});
function scrap() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, i, html, page, page, $, _i, selectors_1, selector, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    browser = null;
                    if (!useBrowserRender) return [3 /*break*/, 2];
                    return [4 /*yield*/, puppeteer.launch({ headless: false })];
                case 1:
                    browser = _a.sent();
                    _a.label = 2;
                case 2:
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < sites.length)) return [3 /*break*/, 14];
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 12, , 13]);
                    html = null;
                    if (!useBrowserRender) return [3 /*break*/, 8];
                    return [4 /*yield*/, browser.newPage()];
                case 5:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto("" + sites[i] + resourcePath)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.content()];
                case 7:
                    html = _a.sent();
                    return [3 /*break*/, 11];
                case 8: return [4 /*yield*/, node_fetch_1["default"]("" + sites[i] + resourcePath)];
                case 9:
                    page = _a.sent();
                    return [4 /*yield*/, page.text()];
                case 10:
                    html = _a.sent();
                    _a.label = 11;
                case 11:
                    $ = cheerioModule.load(html);
                    for (_i = 0, selectors_1 = selectors; _i < selectors_1.length; _i++) {
                        selector = selectors_1[_i];
                        if ($(selector).length >= 1) {
                            sitesMap.get(sites[i]).push(selector + " (" + $(selector).length + ")");
                            selectorsMap.set(selector, selectorsMap.get(selector) + 1);
                        }
                    }
                    console.clear();
                    console.log("Matching selectors (" + Math.round((i * 100) / sites.length) + "% completed)\n");
                    console.log(selectorsMap);
                    return [3 /*break*/, 13];
                case 12:
                    error_1 = _a.sent();
                    if (useBrowserRender) {
                        sitesMap.get(sites[i]).push(error_1);
                    }
                    return [3 /*break*/, 13];
                case 13:
                    i++;
                    return [3 /*break*/, 3];
                case 14:
                    if (!browser) return [3 /*break*/, 16];
                    return [4 /*yield*/, browser.close()];
                case 15:
                    _a.sent();
                    _a.label = 16;
                case 16:
                    console.clear();
                    console.log(sitesMap);
                    console.log(selectorsMap);
                    return [2 /*return*/];
            }
        });
    });
}
scrap();
