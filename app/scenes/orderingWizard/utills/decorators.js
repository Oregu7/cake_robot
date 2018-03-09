const { MainKeyboard } = require("config").get("share");
const { getProperty } = require("./manager");

function cancel(ctx) {
    ctx.reply("Выберите пожалуйста интересующий Вам раздел", MainKeyboard.extra());
    return ctx.scene.leave();
}

const back = (callback) => (ctx) => {
    callback(ctx);
    return ctx.wizard.back();
};

const next = (property, warningMessage, callback) => (ctx) => {
    const val = getProperty(ctx, property);
    if (!val.length) return ctx.reply(warningMessage);

    callback(ctx);
    return ctx.wizard.next();
};

exports.back = (handler) => (callback) => {
    handler.command("back", back(callback));
    handler.hears(/назад/i, back(callback));
};

exports.cancel = (handler) => {
    handler.command("cancel", cancel);
    handler.hears(/отмена/i, cancel);
};

exports.next = (handler) => (property, warningMessage, callback) => {
    handler.command("next", next(property, warningMessage, callback));
    handler.hears(/дальше/i, next(property, warningMessage, callback));
};