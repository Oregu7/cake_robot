const Markup = require("telegraf/markup");
const moment = require("moment");
const ClientModel = require("../models/client");
const OrderModel = require("../models/order");
const compileMessage = require("../helpers/compileMessage");
const Pagination = require("../helpers/pagination");

const pagination = new Pagination("order_page");
moment.locale("ru");

module.exports = async(ctx, page = 1, clientId) => {
    clientId = clientId ? clientId : (await ClientModel.getClientOrCreate(ctx))._id;
    const { docs, pages, limit } = await OrderModel.paginate({ clientId }, {
        sort: "-date",
        page,
        limit: 5,
    });
    if (!docs.length) return { empty: true };

    const factor = (page - 1) * limit;
    const ordersMessage = docs.map((order, indx) => {
        let number = indx + 1 + factor;
        let text = `${number}) Заказ <b>#${order.publicId}</b>
        Сумма: ${order.sumTotal} руб.
        Дата: ${moment(order.date).format("LLLL")}
        Статус: ${order.status === 0 ? "Ожидание подтверждения" : "Доставка"}
        
        <b>Подробнее: </b>/order${order.publicId}
        <b>Оплатить: </b>/pay_order${order.publicId}`;

        return text;
    }).join("\n\n");

    const message = `<b>Ваши заказы:</b>\n\n${ordersMessage}`;
    const keyboard = Markup.inlineKeyboard([
        pagination.createPagesInlineKeyboard(clientId, page, pages),
    ]);

    return {
        message: compileMessage(message),
        keyboard,
        empty: false,
    };
};