const moment = require("moment");
const Markup = require("telegraf/markup");
const compileMessage = require("../helpers/compileMessage");
const { getProductInfo } = require("../helpers/cartManager");
const OrderModel = require("../models/order");

moment.locale("ru");

async function getOrder(ctx) {
    const [, publicId] = ctx.match;
    const order = await OrderModel.findOne({ publicId }).populate("products.product");
    return order;
}

function getOrderMainInfo(order) {
    const message = `Сумма: ${order.sumTotal} руб.
    Дата: ${moment(order.date).format("LLLL")}
    Статус: ${order.status === 0 ? "Ожидание подтверждения" : "Доставка"}
    
    Ваши данные:
    Имя: ${order.firstName}
    Телефон: ${order.phone}
    Адрес: ${order.address}
    Тип доставки: ${order.delivery === "self" ? "самовывоз" : "доставка на дом"}`;

    return message;
}

exports.moreInfo = async(ctx) => {
    const order = await getOrder(ctx);
    const productsInfo = order.products.map(({ product, count }) => {
        return `\u{1F4E6}${getProductInfo(product)} - ${count} шт.`;
    }).join("\n");

    const message = `Заказ <b>#${order.publicId}</b>
    ${getOrderMainInfo(order)}
    
    Ваши покупки:
    ${productsInfo}
    
    <b>Оплатить: </b>/pay_order${order.publicId}`;

    return ctx.replyWithHTML(compileMessage(message));
};

exports.buy = async(ctx) => {
    const order = await getOrder(ctx);
    const invoice = {
        provider_token: process.env.YANDEX_TOKEN,
        start_parameter: "cake_cool",
        title: `Заказ #${order.publicId}`,
        description: compileMessage(getOrderMainInfo(order)),
        currency: "RUB",
        photo_url: "https://cdn0.iconfinder.com/data/icons/ie_Financial_set/256/09.png",
        // is_flexible: true,
        prices: [
            { label: "ИТОГ", amount: order.sumTotal * 100 },
        ],
        payload: {
            order_id: order._id,
        },
    };

    const replyOptions = Markup.inlineKeyboard([
        Markup.payButton("\u{1F4B5} ОПЛАТИТЬ СЕЙЧАС"),
    ]).extra();

    return ctx.replyWithInvoice(invoice, replyOptions);
};