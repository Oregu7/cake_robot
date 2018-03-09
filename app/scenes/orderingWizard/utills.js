const DELIVERY_PROPERTY = "delivery";
const FIRSTNAME_PROPERY = "firstName";
const PHONE_PROPERTY = "phone";
const ADDRESS_PROPERTY = "address";

const START_MESSAGES = {
    [DELIVERY_PROPERTY]: "Укажите тип доставки:",
    [FIRSTNAME_PROPERY]: "Укажите Ваше имя:",
    [PHONE_PROPERTY]: "Укажите Ваш номер (мобильный телефон):",
    [ADDRESS_PROPERTY]: "Отправьте Вашу геолокацию, или укажите точный адрес (город, улица, дом):",
};

function getOrdering(ctx) {
    if (!ctx.session.ordering) ctx.session.ordering = {};
    return ctx.session.ordering;
}

function getProperty(ctx, property) {
    const ordering = getOrdering(ctx);
    return ordering[property] || "";
}

function setProperty(property, ctx, value) {
    const ordering = getOrdering(ctx);
    ordering[property] = value;
    return ordering;
}

function sendStartMessage(property, ctx) {
    const message = `${START_MESSAGES[property]}\nВаше значение: ${getProperty(ctx, property)}`;
    ctx.reply(message);
}

exports.setDelivery = setProperty.bind(null, DELIVERY_PROPERTY);
exports.setFirstName = setProperty.bind(null, FIRSTNAME_PROPERY);
exports.setPhone = setProperty.bind(null, PHONE_PROPERTY);
exports.setAddress = setProperty.bind(null, ADDRESS_PROPERTY);

exports.sendStartDeliveryMessage = sendStartMessage.bind(null, DELIVERY_PROPERTY);
exports.sendStartFirstNameMessage = sendStartMessage.bind(null, FIRSTNAME_PROPERY);
exports.sendStartPhoneMessage = sendStartMessage.bind(null, PHONE_PROPERTY);
exports.sendStartAddressMessage = sendStartMessage.bind(null, ADDRESS_PROPERTY);