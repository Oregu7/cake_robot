const Extra = require("telegraf/extra");
const historyHandler = require("../handlers/historyHandler");

module.exports = async(ctx) => {
    const { message, keyboard, empty } = await historyHandler(ctx);
    if (empty) return ctx.reply("Вы ещё ничего не заказывали!\nПосмотрите наше меню: /menu");

    return ctx.replyWithHTML(message, Extra.markup(keyboard));
};