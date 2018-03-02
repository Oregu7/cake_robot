const Markup = require("telegraf/markup");
const Scene = require("telegraf/scenes/base");
const { leave } = require("telegraf/stage");
const { MainKeyboard } = require("config").get("share");
const createClient = require("../../helpers/createClient");
// const ClientModel = require("../../models/client");

// Greeter scene
const settingsScene = new Scene("settings");

settingsScene.enter(async(ctx) => {
    const message = "Выберите настройки, которые хотите поменять:";
    if (!ctx.session.hasOwnProperty("settings")) {
        await createClient(ctx);
        // ctx.session.settings = await ClientModel.findOne({ userId: ctx.from.id });
    }
    const keyboard = Markup.keyboard([
        [Markup.button("Имя"), Markup.button("Телефон"), Markup.button("Адрес")],
        [Markup.button("Уведомления")],
        [Markup.button("Назад")],
    ]);
    return ctx.reply(message, keyboard.extra());
});

settingsScene.leave((ctx) => ctx.reply("Выберите пожалуйста интересующий Вам раздел", MainKeyboard.extra()));
settingsScene.hears(/имя/gi, (ctx) => {
    ctx.scene.reset();
    return ctx.scene.enter("settings:name");
});
settingsScene.hears(/телефон/gi, (ctx) => {
    ctx.scene.reset();
    return ctx.scene.enter("settings:phone");
});
settingsScene.hears(/адрес/gi, (ctx) => {
    ctx.scene.reset();
    return ctx.scene.enter("settings:address");
});

settingsScene.hears(/(отмена|назад)/gi, leave());
settingsScene.command("cancel", leave());
settingsScene.on("message", settingsScene.enterHandler);

module.exports = settingsScene;