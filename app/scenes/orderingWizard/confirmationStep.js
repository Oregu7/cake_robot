const { MainKeyboard } = require("config").get("share");

module.exports = (ctx) => {
    console.log(ctx.session.ordering);
    ctx.reply("Done", MainKeyboard.extra());
    return ctx.scene.leave();
};