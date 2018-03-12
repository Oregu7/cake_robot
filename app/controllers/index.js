const startController = require("./startCommandController");
const menuController = require("./menuCommandController");
const cartController = require("./cartController");
const newsController = require("./newsCommandController");
const historyController = require("./historyController");
const orderController = require("./orderController");

const callbackController = require("./callbackController");
const inlinequeryController = require("./inlinequeryController");

module.exports = {
    startController,
    menuController,
    cartController,
    newsController,
    historyController,
    orderController,
    callbackController,
    inlinequeryController,
};