const { MainKeyboard } = require("config").get("share");

function cancel(ctx) {
    ctx.reply("Выберите пожалуйста интересующий Вам раздел", MainKeyboard.extra());
    return ctx.scene.leave();
}

function back(ctx) {
    return ctx.wizard.back();
}

exports.back = (handler) => {
    handler.command("back", back);
    handler.hears(/назад/i, back);
};

exports.cancel = (handler) => {
    handler.command("cancel", cancel);
    handler.hears(/отмена/i, cancel);
};