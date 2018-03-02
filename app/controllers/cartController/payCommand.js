const Markup = require("telegraf/markup");
const randomize = require("randomatic");
const { getProducts, getProductInfo } = require("../../helpers/cartManager");

module.exports = async(ctx) => {
    let sumTotal = 0;
    let description = "Ваши покупки:\n\n";
    const products = await getProducts(ctx);
    for (let product of products) {
        let sum = product.count * product.price;
        sumTotal += sum;
        description += `\u{1F381}${getProductInfo(product)} - ${product.count} шт.\n`;
    }

    const invoice = {
        provider_token: process.env.YANDEX_TOKEN,
        start_parameter: "cake_cool",
        title: `Заказ#${randomize("0", 7)}`,
        description,
        currency: "RUB",
        photo_url: "https://cdn0.iconfinder.com/data/icons/ie_Financial_set/256/09.png",
        // is_flexible: true,
        prices: [
            { label: "ИТОГ", amount: sumTotal * 100 },
        ],
        payload: {
            coupon: "BLACK FRIDAY",
        },
        need_name: true,
        need_phone_number: true,
    };

    const replyOptions = Markup.inlineKeyboard([
        Markup.payButton("\u{1F4B5} КУПИТЬ"),
    ]).extra();

    ctx.replyWithInvoice(invoice, replyOptions);
};