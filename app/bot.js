const config = require("config");
const Telegraf = require("telegraf");
const session = require("telegraf/session");
const controllers = require("./controllers");

const token = config.get("bot.token");
const bot = new Telegraf(token);
// middlewares
bot.use(session());
// commands
bot.start(controllers.startController);
bot.command("menu", controllers.menuController);
bot.command("cart", controllers.cartController);
// patterns
bot.hears(/^\u{1F37D}меню$/iu, controllers.menuController);
bot.hears(/^\u{2753}помощь$/iu, controllers.startController);
bot.hears(/^\u{1F6CD}корзина$/iu, controllers.cartController);
// events
bot.on("callback_query", controllers.callbackController);
bot.on("inline_query", controllers.inlinequeryController);
bot.catch((err) => {
    console.error(err);
});

module.exports = bot;