const Extra = require("telegraf/extra");
const { getOrdering } = require("./manager");
const { getProducts, getProductInfo } = require("../../../helpers/cartManager");
const compileMessage = require("../../../helpers/compileMessage");

const {
    DELIVERY_PROPERTY,
    FIRSTNAME_PROPERY,
    PHONE_PROPERTY,
    ADDRESS_PROPERTY,
    CONFIRMATION,
} = require("./constants");

const getKeyboard = require("./keyboard");
const { getProperty } = require("./manager");

const START_MESSAGES = {
    [DELIVERY_PROPERTY]: "Укажите тип доставки!",
    [FIRSTNAME_PROPERY]: "Укажите Ваше имя!",
    [PHONE_PROPERTY]: "Укажите Ваш номер (мобильный телефон)!",
    [ADDRESS_PROPERTY]: "Отправьте Вашу геолокацию, или напишите Ваш адрес в формате: Город, ул д!",
};

function sendStartMessage(property, ctx) {
    const value = getProperty(ctx, property);
    const keyboard = getKeyboard(property, value);
    const message = `${START_MESSAGES[property]}\nТекущее значение: ${value}`;
    ctx.reply(message, Extra.markup(keyboard));
}

exports.sendStartFirstNameMessage = sendStartMessage.bind(null, FIRSTNAME_PROPERY);
exports.sendStartPhoneMessage = sendStartMessage.bind(null, PHONE_PROPERTY);
exports.sendStartAddressMessage = sendStartMessage.bind(null, ADDRESS_PROPERTY);

exports.sendStartDeliveryMessage = (ctx) => {
    const value = getProperty(ctx, DELIVERY_PROPERTY) === "self" ? "самовывоз" : "доставка на дом";
    const keyboard = getKeyboard(DELIVERY_PROPERTY, value);
    const message = `${START_MESSAGES[DELIVERY_PROPERTY]}\nТекущее значение: ${value}`;
    ctx.reply(message, Extra.markup(keyboard));
};

exports.sendConfirmationMessage = async(ctx) => {
    const ordering = getOrdering(ctx);
    let sumTotal = 0;
    let myProducts = [];
    let productsDescription = "";
    const products = await getProducts(ctx);
    for (let product of products) {
        let sum = product.count * product.price;
        sumTotal += sum;
        myProducts.push({ product: product._id, count: product.count });
        productsDescription += `\u{1F381}${getProductInfo(product)} - ${product.count} шт.\n`;
    }

    ordering.sumTotal = sumTotal;
    ordering.products = myProducts;

    const message = `<b>Ваши данные:</b>\n
    Имя: ${ordering.firstName}
    Телефон: ${ordering.phone}
    Адрес: ${ordering.address}
    Тип доставки: ${ordering.delivery === "self" ? "самовывоз" : "доставка на дом"}
    
    <b>Ваши покупки:</b>\n
    ${productsDescription}
    ${"\u{2796}".repeat(7)}
    <b>Итого: </b> ${sumTotal} руб.`;

    const keyboard = getKeyboard(CONFIRMATION, "");
    ctx.replyWithHTML(compileMessage(message), Extra.markup(keyboard));
};