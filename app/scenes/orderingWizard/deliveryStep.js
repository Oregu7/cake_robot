const Composer = require("telegraf/composer");
const decorators = require("./decorators");
const { setDelivery } = require("./utills");
const deliveryHandler = new Composer();

deliveryHandler.hears(/самовывоз/i, (ctx) => {
    setDelivery(ctx, "self");
    return ctx.wizard.next();
});

deliveryHandler.hears(/доставка на дом/i, (ctx) => {
    setDelivery(ctx, "home");
    return ctx.wizard.next();
});

// use decorators
decorators.back(deliveryHandler);
decorators.cancel(deliveryHandler);

// default
deliveryHandler.use((ctx) => {
    return ctx.replyWithMarkdown("Укажите вариант доставки:");
});

module.exports = deliveryHandler;