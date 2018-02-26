const Markup = require("telegraf/markup");
const { suid } = require("rand-token");

module.exports = (ctx) => {
    const message = "Нажмите - \u{1F6CD}Открыть корзину, чтобы увидеть текущее содержимое Вашей корзины.";
    const keyboard = Markup.inlineKeyboard([
        Markup.switchToCurrentChatButton("\u{1F6CD}Открыть корзину", `корзина_#${suid(7)}`),
    ]);

    return ctx.reply(message, keyboard.extra());
};