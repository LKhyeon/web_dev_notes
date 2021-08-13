"use strict";
exports.__esModule = true;
var browser_1 = require("./browser");
var pageController_1 = require("./pageController");
//Start the browser and create a browser instance
var browserInstance = browser_1["default"]();
// Pass the browser instance to the scraper controller
pageController_1["default"](browserInstance);
