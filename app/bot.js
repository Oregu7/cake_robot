const config = require("config");
const Telegraf = require("telegraf");
const Stage = require("telegraf/stage");
const LocalSession = require("telegraf-session-local");
const controllers = require("./controllers");
const scenes = require("./scenes");

const { enter, leave } = Stage;
const token = config.get("bot.token");
const bot = new Telegraf(token);

// Create scene manager
const stage = new Stage();
// Scene registration
stage.register(scenes.clearCartScene);
stage.register(...scenes.settingsScene);
stage.register(scenes.orderingWizard);
// middlewares
bot.use((new LocalSession({ database: "example_db.json" })).middleware());
bot.use(stage.middleware());
// commands
bot.start(controllers.startController);
bot.command("menu", controllers.menuController);
bot.command("cart", controllers.cartController.cartCommand);
bot.command("news", controllers.newsController);
bot.command("history", controllers.historyController);
bot.command("clearcart", enter("clearCart"));
bot.command("settings", enter("settings"));
bot.command("pay", enter("ordering-wizard"));
bot.command("cancel", leave());
// patterns
bot.hears(/^\u{1F37D}меню$/iu, controllers.menuController);
bot.hears(/^\u{2753}помощь$/iu, controllers.startController);
bot.hears(/^\u{1F6CD}корзина$/iu, controllers.cartController.cartCommand);
bot.hears(/\/product_([\w_-]+)/i, controllers.cartController.productCommand);
bot.hears(/\/order(\d+)/i, controllers.orderController.moreInfo);
bot.hears(/\/pay_order(\d+)/i, controllers.orderController.buy);
// events
bot.on("callback_query", controllers.callbackController);
bot.on("inline_query", controllers.inlinequeryController);
bot.catch((err) => {
    console.error(err);
});

module.exports = bot;