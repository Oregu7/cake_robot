const config = require("config");
const Telegraf = require("telegraf");
const Stage = require("telegraf/stage");
const LocalSession = require("telegraf-session-local");
const controllers = require("./controllers");

const token = config.get("bot.token");
const bot = new Telegraf(token);

// Create scene manager
const stage = new Stage();
// Scene registration
stage.register(controllers.cartController.clearCartScene);
// middlewares
bot.use((new LocalSession({ database: "example_db.json" })).middleware());
bot.use(stage.middleware());
// commands
bot.start(controllers.startController);
bot.command("menu", controllers.menuController);
bot.command("cart", controllers.cartController.cartCommand);
bot.command("product", controllers.cartController.productCommand);
bot.command("clearcart", (ctx) => ctx.scene.enter("clearCart"));
bot.command("cancel", Stage.leave());
// patterns
bot.hears(/^\u{1F37D}меню$/iu, controllers.menuController);
bot.hears(/^\u{2753}помощь$/iu, controllers.startController);
bot.hears(/^\u{1F6CD}корзина$/iu, controllers.cartController.cartCommand);
// events
bot.on("callback_query", controllers.callbackController);
bot.on("inline_query", controllers.inlinequeryController);
bot.catch((err) => {
    console.error(err);
});

module.exports = bot;