const ClientModel = require("../../models/client");
const { sendStartFirstNameMessage } = require("./utills").messages;
const { getCartSize } = require("../../helpers/cartManager");

module.exports = async(ctx) => {
    const cartSize = getCartSize(ctx);
    if (!cartSize) {
        ctx.scene.leave();
        return ctx.reply("Вы ничего не положили в корзину!\nПосмотрите лучше меню: /menu");
    }

    if (ctx.session.hasOwnProperty("ordering")) {
        sendStartFirstNameMessage(ctx);
        return ctx.wizard.next();
    }

    const { firstName, phone, address, _id: clientId } = await ClientModel.getClientOrCreate(ctx);
    ctx.session.ordering = {
        firstName,
        phone,
        address,
        clientId,
        sumTotal: 0,
        products: [],
        delivery: "self", // self - самовывоз || home - доставка на дом
    };

    sendStartFirstNameMessage(ctx);
    return ctx.wizard.next();
};