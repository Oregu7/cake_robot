const Markup = require("telegraf/markup");
const Scene = require("telegraf/scenes/base");
const { leave } = require("telegraf/stage");
const { MainKeyboard } = require("config").get("share");
const ClientModel = require("../../models/client");

// Greeter scene
const settingsScene = new Scene("settings");

settingsScene.enter(async(ctx) => {
    const client = await ClientModel.getClientOrCreate(ctx);
    const message = "Выберите настройки, которые хотите поменять:";
    const keyboard = Markup.keyboard([
        [Markup.button("Имя"), Markup.button("Телефон"), Markup.button("Адрес")],
        [Markup.button(`Уведомления [ ${client.notification ? "\u{1F515}ОТКЛ." : "\u{1F514}ВКЛ."} ]`)],
        [Markup.button("Назад")],
    ]);
    return ctx.reply(message, keyboard.extra());
});

settingsScene.leave((ctx) => ctx.reply("Выберите пожалуйста интересующий Вам раздел", MainKeyboard.extra()));
settingsScene.hears(/имя/i, (ctx) => {
    ctx.scene.reset();
    return ctx.scene.enter("settings:name");
});

settingsScene.hears(/(откл|вкл)\./i, async(ctx) => {
    const client = await ClientModel.getClientOrCreate(ctx);
    client.notification = !client.notification;
    let ok = await client.save();
    ctx.reply(`Вы ${client.notification ? "подписались на обновления" : "отписались от обновлений"}`);
    return settingsScene.enterHandler(ctx);
});

settingsScene.hears(/телефон/i, (ctx) => {
    ctx.scene.reset();
    return ctx.scene.enter("settings:phone");
});
settingsScene.hears(/адрес/i, (ctx) => {
    ctx.scene.reset();
    return ctx.scene.enter("settings:address");
});

settingsScene.hears(/(отмена|назад)/gi, leave());
settingsScene.command("cancel", leave());
settingsScene.on("message", settingsScene.enterHandler);

module.exports = settingsScene;