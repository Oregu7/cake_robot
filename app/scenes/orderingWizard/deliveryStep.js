const Composer = require("telegraf/composer");

const deliveryHandler = new Composer();

deliveryHandler.hears(/самовывоз/i, (ctx) => {

});

deliveryHandler.hears(/доставка на дом/i, (ctx) => {

});

deliveryHandler.command("back", (ctx) => {

});

deliveryHandler.command("cancel", (ctx) => {

});

deliveryHandler.hears(/назад/i, (ctx) => {

});

deliveryHandler.hears(/отмена/i, (ctx) => {

});

// default
deliveryHandler.use((ctx) => {

});

module.exports = deliveryHandler;