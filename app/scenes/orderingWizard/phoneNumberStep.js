const Composer = require("telegraf/composer");
const escape = require("escape-html");
const { isMobilePhone } = require("validator");
const { decorators } = require("./utills");
const { PHONE_PROPERTY } = require("./utills").constants;
const { setPhone } = require("./utills").properties;
const { sendStartDeliveryMessage, sendStartFirstNameMessage } = require("./utills").messages;

const phoneNumber = new Composer();
const warningMessage = "Укажите пожалуйста корректный телефонный номер:";
// use decorators
decorators.cancel(phoneNumber);
decorators.back(phoneNumber)(sendStartFirstNameMessage);
decorators.next(phoneNumber)(PHONE_PROPERTY, warningMessage, sendStartDeliveryMessage);

phoneNumber.on("contact", (ctx) => {
    const { phone_number: phone } = ctx.message.contact;
    setPhone(ctx, phone);
    sendStartDeliveryMessage(ctx);
    return ctx.wizard.next();
});

phoneNumber.on("text", (ctx) => {
    const phone = escape(ctx.message.text);
    if (!isMobilePhone(phone, "ru-RU")) {
        let message = `Вы ввели <b>не валидный</b> телефонный номер: <code>${phone}</code>`;
        return ctx.replyWithHTML(message);
    }
    setPhone(ctx, phone);
    sendStartDeliveryMessage(ctx);
    return ctx.wizard.next();
});

// default
phoneNumber.on("message", (ctx) => {
    return ctx.reply(warningMessage);
});

module.exports = phoneNumber;