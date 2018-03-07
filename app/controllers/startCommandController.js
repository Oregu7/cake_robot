const Extra = require("telegraf/extra");
const { MainKeyboard, StartMessage } = require("config").get("share");
const ClientModel = require("../models/client");
const { payCommand } = require("./cartController");

module.exports = async(ctx) => {
    const authorized = ctx.session.authorized || false;
    const parts = ctx.message.text.split(" ");
    const route = parts[1] || "/";

    if (!authorized) {
        let client = await ClientModel.getClientOrCreate(ctx);
        ctx.session.authorized = true;
        console.log(`[ new client ] => ${client.username}:${client.userId}`);
    }

    if (route === "pay") return payCommand(ctx);
    else return ctx.reply(StartMessage, Extra.HTML().markup(MainKeyboard));
};