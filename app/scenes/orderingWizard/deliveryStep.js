const Composer = require("telegraf/composer");
const { decorators } = require("./utills");
const { getProperty } = require("./utills").manager;
const { DELIVERY_PROPERTY } = require("./utills").constants;
const {
    sendStartPhoneMessage,
    sendStartAddressMessage,
    sendConfirmationMessage,
} = require("./utills").messages;
const { setDelivery } = require("./utills").properties;

const deliveryHandler = new Composer();
// use decorators
decorators.back(deliveryHandler)(sendStartPhoneMessage);
decorators.cancel(deliveryHandler);
deliveryHandler.hears(/дальше/i, (ctx) => {
    const delivery = getProperty(ctx, DELIVERY_PROPERTY);
    if (delivery === "self") {
        ctx.wizard.next();
        ctx.wizard.next();
        return sendConfirmationMessage(ctx);
    } else {
        ctx.wizard.next();
        return sendStartAddressMessage(ctx);
    }
});
// handlers
deliveryHandler.hears(/самовывоз/i, (ctx) => {
    setDelivery(ctx, "self");
    ctx.wizard.next();
    ctx.wizard.next();
    return sendConfirmationMessage(ctx);
});

deliveryHandler.hears(/доставка на дом/i, (ctx) => {
    setDelivery(ctx, "home");
    ctx.wizard.next();
    return sendStartAddressMessage(ctx);
});

// default
deliveryHandler.use((ctx) => {
    return ctx.replyWithMarkdown("Укажите вариант доставки:");
});

module.exports = deliveryHandler;