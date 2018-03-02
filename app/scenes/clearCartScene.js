const Markup = require("telegraf/markup");
const Scene = require("telegraf/scenes/base");
const { leave } = require("telegraf/stage");
const { MainKeyboard } = require("config").get("share");
const { clearCart } = require("../helpers/cartManager");

// Greeter scene
const clearCartScene = new Scene("clearCart");
clearCartScene.enter((ctx) => {
    const message = "Вы точно решили удалить все товары из Вашей корзины?";
    const keyboard = Markup.keyboard([
        Markup.button("ДА, очистить \u{1F5D1}"),
        Markup.button("\u{2716}ОТМЕНА"),
    ]);
    return ctx.reply(message, keyboard.extra());
});
clearCartScene.leave((ctx) => ctx.reply("Выберите пожалуйста интересующий Вам раздел", MainKeyboard.extra()));

clearCartScene.hears(/да/gi, (ctx) => {
    clearCart(ctx);
    ctx.reply("Ваша корзина очищена", MainKeyboard.extra());
    ctx.scene.reset();
});
clearCartScene.hears(/отмена/gi, leave());
clearCartScene.command("cancel", leave());
clearCartScene.on("message", clearCartScene.enterHandler);

module.exports = clearCartScene;