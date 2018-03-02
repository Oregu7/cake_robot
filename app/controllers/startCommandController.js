const Extra = require("telegraf/extra");
const { MainKeyboard, StartMessage } = require("config").get("share");
const createClient = require("../helpers/createClient");

module.exports = async(ctx) => {
    const authorized = ctx.session.authorized || false;
    if (!authorized) {
        let client = await createClient(ctx);
        console.log(`[ new client ] => ${client.username}:${client.userId}`);
    }
    return ctx.reply(StartMessage, Extra.HTML().markup(MainKeyboard));
};