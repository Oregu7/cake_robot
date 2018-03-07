const Composer = require("telegraf/composer");
const decorators = require("./decorators");
const deliveryHandler = new Composer();

deliveryHandler.hears(/самовывоз/i, (ctx) => {

});

deliveryHandler.hears(/доставка на дом/i, (ctx) => {

});

// use decorators
decorators.back(deliveryHandler);
decorators.cancel(deliveryHandler);

// default
deliveryHandler.use((ctx) => {
    return ctx.replyWithMarkdown("Укажите вариант доставки:");
});

module.exports = deliveryHandler;