const Composer = require("telegraf/composer");
const escape = require("escape-html");
const decorators = require("./decorators");
const { setFirstName, sendStartDeliveryMessage } = require("./utills");
const firstName = new Composer();

firstName.start((ctx) => {
    ctx.reply("Введи имя:");
});

firstName.on("text", (ctx) => {
    const name = escape(ctx.message.text);
    setFirstName(ctx, name);
    sendStartDeliveryMessage(ctx);
    return ctx.wizard.next();
});

// use decorators
decorators.cancel(firstName);

// default
firstName.on("message", (ctx) => {
    return ctx.replyWithMarkdown("Укажите пожалуйста Ваше имя:");
});

module.exports = firstName;