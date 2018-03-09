const Extra = require("telegraf/extra");
const {
    DELIVERY_PROPERTY,
    FIRSTNAME_PROPERY,
    PHONE_PROPERTY,
    ADDRESS_PROPERTY,
} = require("./constants");

const getKeyboard = require("./keyboard");
const { getProperty } = require("./manager");

const START_MESSAGES = {
    [DELIVERY_PROPERTY]: "Укажите тип доставки!",
    [FIRSTNAME_PROPERY]: "Укажите Ваше имя!",
    [PHONE_PROPERTY]: "Укажите Ваш номер (мобильный телефон)!",
    [ADDRESS_PROPERTY]: "Отправьте Вашу геолокацию, или укажите точный адрес (город, улица, дом)!",
};

function sendStartMessage(property, ctx) {
    const value = getProperty(ctx, property);
    const keyboard = getKeyboard(property, value);
    const message = `${START_MESSAGES[property]}\nТекущее значение: ${value}`;
    ctx.reply(message, Extra.markup(keyboard));
}

exports.sendStartDeliveryMessage = (ctx) => {
    const value = getProperty(ctx, DELIVERY_PROPERTY) === "self" ? "самовывоз" : "доставка на дом";
    const keyboard = getKeyboard(DELIVERY_PROPERTY, value);
    const message = `${START_MESSAGES[DELIVERY_PROPERTY]}\nТекущее значение: ${value}`;
    ctx.reply(message, Extra.markup(keyboard));
};

exports.sendStartFirstNameMessage = sendStartMessage.bind(null, FIRSTNAME_PROPERY);
exports.sendStartPhoneMessage = sendStartMessage.bind(null, PHONE_PROPERTY);
exports.sendStartAddressMessage = sendStartMessage.bind(null, ADDRESS_PROPERTY);