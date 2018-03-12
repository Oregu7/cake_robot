const { MainKeyboard } = require("config").get("share");
const Composer = require("telegraf/composer");
const OrderModel = require("../../models/order");
const { clearCart } = require("../../helpers/cartManager");
const compileMessage = require("../../helpers/compileMessage");
const { decorators } = require("./utills");
const { getProperty, deleteOrdering, getOrdering } = require("./utills").manager;
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
confirmationHandler.hears(/подтвердить заказ/i, async(ctx) => {
    const ordering = getOrdering(ctx);
    const myOrder = await OrderModel.create(ordering);

    const message = `ЗАКАЗ #<b>${myOrder.publicId}</b>
    Имя: ${myOrder.firstName}
    Телефон: ${myOrder.phone}
    Статус: ${myOrder.status === 0 ? "Ожидание подтверждения" : "Доставка"}
    Сумма: ${myOrder.sumTotal} руб.

    Тип доставки: ${myOrder.delivery === "self" ? "самовывоз" : "доставка на дом"}
    Адрес: ${myOrder.address}
    
    <b>Подробнее: </b>/order${myOrder.publicId}`;
    // выходим из сцены и очищаем данные
    ctx.scene.leave();
    deleteOrdering(ctx);
    clearCart(ctx);

    return ctx.replyWithHTML(compileMessage(message), MainKeyboard.extra());
});

// default
confirmationHandler.use((ctx) => {
    return ctx.replyWithMarkdown("Укажите вариант доставки:");
});

module.exports = confirmationHandler;