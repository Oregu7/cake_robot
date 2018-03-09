const Composer = require("telegraf/composer");
const escape = require("escape-html");
const { decorators } = require("./utills");
const { FIRSTNAME_PROPERY } = require("./utills").constants;
const { setFirstName } = require("./utills").properties;
const { sendStartDeliveryMessage } = require("./utills").messages;

const firstName = new Composer();
const warningMessage = "Укажите пожалуйста Ваше имя:";
// use decorators
decorators.cancel(firstName);
decorators.next(firstName)(FIRSTNAME_PROPERY, warningMessage, sendStartDeliveryMessage);

firstName.on("text", (ctx) => {
    const name = escape(ctx.message.text);
    setFirstName(ctx, name);
    sendStartDeliveryMessage(ctx);
    return ctx.wizard.next();
});

// default
firstName.on("message", (ctx) => {
    return ctx.reply(warningMessage);
});

module.exports = firstName;