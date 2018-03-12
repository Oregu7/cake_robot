const Markup = require("telegraf/markup");
const Scene = require("telegraf/scenes/base");
const { leave } = require("telegraf/stage");
const escape = require("escape-html");
const { isMobilePhone } = require("validator");
const { MainKeyboard } = require("config").get("share");
const ClientModel = require("../../models/client");

const settingsPhoneScene = new Scene("settings:phone");

settingsPhoneScene.enter(async(ctx) => {
    const client = await ClientModel.getClientOrCreate(ctx);
    const message = `Ваш телефонный номер: ${client.phone || "\u{1F4DD}"}\nВведите новое значение:`;
    const keyboard = Markup.keyboard([
        [Markup.contactRequestButton("\u{1F4F1} Отправить Телефон")],
        [Markup.button("\u{1F3E0}В гл.меню"), Markup.button("\u{1F519}Назад")],
    ]).resize();
    return ctx.reply(message, keyboard.extra());
});

settingsPhoneScene.leave((ctx) => ctx.reply("Выберите пожалуйста интересующий Вам раздел", MainKeyboard.extra()));
settingsPhoneScene.hears(/Назад/gi, (ctx) => {
    ctx.scene.reset();
    return ctx.scene.enter("settings");
});

settingsPhoneScene.hears(/в гл\.меню/i, leave());
settingsPhoneScene.command("cancel", leave());

settingsPhoneScene.on("contact", (ctx) => {
    const { phone_number: phone } = ctx.message.contact;
    return savePhoneNumberAndBackToSettings(ctx, phone);
});

settingsPhoneScene.on("text", (ctx) => {
    const phone = escape(ctx.message.text);
    if (!isMobilePhone(phone, "ru-RU")) {
        let message = `Вы ввели <b>не валидный</b> телефонный номер: <code>${phone}</code>`;
        return ctx.replyWithHTML(message);
    }
    return savePhoneNumberAndBackToSettings(ctx, phone);
});
settingsPhoneScene.on("message", settingsPhoneScene.enterHandler);

async function savePhoneNumberAndBackToSettings(ctx, phone) {
    let ok = await ClientModel.update({ userId: ctx.from.id }, { $set: { phone } });
    ctx.reply(`Телефон изменен на: ${phone}`);
    ctx.scene.reset();
    return ctx.scene.enter("settings");
}

module.exports = settingsPhoneScene;