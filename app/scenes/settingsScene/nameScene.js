const Markup = require("telegraf/markup");
const Scene = require("telegraf/scenes/base");
const { leave } = require("telegraf/stage");
const escape = require("escape-html");
const { MainKeyboard } = require("config").get("share");
const ClientModel = require("../../models/client");

const settingsNameScene = new Scene("settings:name");

settingsNameScene.enter(async(ctx) => {
    const client = await ClientModel.getClientOrCreate(ctx);
    const message = `Ваше имя: ${client.firstName}\nВведите новое значение:`;
    const keyboard = Markup.keyboard([
        [Markup.button("Начало"), Markup.button("Назад")],
    ]).resize();
    return ctx.reply(message, keyboard.extra());
});

settingsNameScene.leave((ctx) => ctx.reply("Выберите пожалуйста интересующий Вам раздел", MainKeyboard.extra()));
settingsNameScene.hears(/Назад/gi, (ctx) => {
    ctx.scene.reset();
    return ctx.scene.enter("settings");
});

settingsNameScene.hears(/Начало/gi, leave());
settingsNameScene.command("cancel", leave());
settingsNameScene.on("text", async(ctx) => {
    const firstName = escape(ctx.message.text);
    let ok = await ClientModel.update({ userId: ctx.from.id }, { $set: { firstName } });
    ctx.reply(`Имя изменено на: ${firstName}`);
    ctx.scene.reset();
    return ctx.scene.enter("settings");
});
settingsNameScene.on("message", settingsNameScene.enterHandler);

module.exports = settingsNameScene;