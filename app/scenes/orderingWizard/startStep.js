const ClientModel = require("../../models/client");
const { sendStartFirstNameMessage } = require("./utills").messages;

module.exports = async(ctx) => {

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
        delivery: "self", // self - самовывоз || home - доставка на дом
    };

    sendStartFirstNameMessage(ctx);
    return ctx.wizard.next();
};