const Markup = require("telegraf/markup");

const {
    DELIVERY_PROPERTY,
    FIRSTNAME_PROPERY,
    PHONE_PROPERTY,
    ADDRESS_PROPERTY,
    CONFIRMATION,
} = require("./constants");

const keyboards = {
    [DELIVERY_PROPERTY]: createKeyboard.bind(null, [
        Markup.button("\u{1F6B6}Самовывоз"),
        Markup.button("\u{1F697}Доставка на дом"),
    ], true),
    [FIRSTNAME_PROPERY]: createKeyboard.bind(null, [], false),
    [PHONE_PROPERTY]: createKeyboard.bind(null, [
        Markup.contactRequestButton("\u{1F4F2}Отправить Мой номер"),
    ], true),
    [ADDRESS_PROPERTY]: createKeyboard.bind(null, [
        Markup.locationRequestButton("\u{1F4CD}Отправить Мое местоположение"),
    ], true),
    [CONFIRMATION]: createKeyboard.bind(null, [
        Markup.button("\u{2705}Подтвердить заказ"),
    ], true),
};

function createKeyboard(optionalButtons = [], back = true, value) {
    const baseButtons = [Markup.button("\u{2716}Отмена")];
    if (back) baseButtons.unshift(Markup.button("\u{1F519}Назад"));
    const keyboard = [baseButtons];
    if (optionalButtons.length) keyboard.unshift(optionalButtons);
    if (value.length) keyboard.unshift([Markup.button("\u{2705}Дальше")]);

    return Markup.keyboard(keyboard).resize(true);
}

module.exports = (property, value) => {
    return keyboards[property](value);
};