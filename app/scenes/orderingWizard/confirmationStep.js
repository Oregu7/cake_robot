const { MainKeyboard } = require("config").get("share");
const Composer = require("telegraf/composer");
const { decorators } = require("./utills");
const { getProperty, deleteOrdering } = require("./utills").manager;
const { DELIVERY_PROPERTY } = require("./utills").constants;
const {
    sendStartAddressMessage,
    sendStartDeliveryMessage,
} = require("./utills").messages;

const confirmationHandler = new Composer();
// use decorators
decorators.cancel(confirmationHandler);
confirmationHandler.hears(/назад/i, (ctx) => {
    const delivery = getProperty(ctx, DELIVERY_PROPERTY);
    if (delivery === "self") {
        ctx.wizard.back();
        ctx.wizard.back();
        return sendStartDeliveryMessage(ctx);
    } else {
        ctx.wizard.back();
        return sendStartAddressMessage(ctx);
    }
});

// handlers
confirmationHandler.hears(/подтвердить заказ/i, (ctx) => {
    console.log(ctx.session.ordering);
    deleteOrdering(ctx);
    ctx.reply("Done", MainKeyboard.extra());
    return ctx.scene.leave();
});

// default
confirmationHandler.use((ctx) => {
    return ctx.replyWithMarkdown("Укажите вариант доставки:");
});

module.exports = confirmationHandler;