const Composer = require("telegraf/composer");
const { decorators } = require("./utills");
const { sendStartFirstNameMessage } = require("./utills").messages;
const { setDelivery } = require("./utills").properties;
const deliveryHandler = new Composer();

// use decorators
decorators.back(deliveryHandler)(sendStartFirstNameMessage);
decorators.cancel(deliveryHandler);

// handlers
deliveryHandler.hears(/самовывоз/i, (ctx) => {
    setDelivery(ctx, "self");
    return ctx.wizard.next();
});

deliveryHandler.hears(/доставка на дом/i, (ctx) => {
    setDelivery(ctx, "home");
    return ctx.wizard.next();
});

// default
deliveryHandler.use((ctx) => {
    return ctx.replyWithMarkdown("Укажите вариант доставки:");
});

module.exports = deliveryHandler;