const Markup = require("telegraf/markup");
const Scene = require("telegraf/scenes/base");
const { leave } = require("telegraf/stage");
const escape = require("escape-html");
const NodeGeocoder = require("node-geocoder");
const { MainKeyboard } = require("config").get("share");
const compileMessage = require("../../helpers/compileMessage");
const ClientModel = require("../../models/client");

const settingsPhoneScene = new Scene("settings:address");
const options = {
    provider: "google",

    // Optional depending on the providers
    httpAdapter: "https", // Default
    apiKey: process.env.GEOCODING_API, // for Mapquest, OpenCage, Google Premier
    formatter: null, // "gpx", "string", ...
};

const geocoder = NodeGeocoder(options);

settingsPhoneScene.enter(async(ctx) => {
    const client = await ClientModel.getClientOrCreate(ctx);
    const message = `Ваш адрес: ${client.address || "\u{1F4DD}"}

    Вы можете просто отправить Геолокацию.
    Или написать адрес в формате: Город, ул д`;
    const keyboard = Markup.keyboard([
        [Markup.locationRequestButton("Отправить Адрес \u{1F4CD}")],
        [Markup.button("\u{1F3E0}В гл.меню"), Markup.button("\u{1F519}Назад")],
    ]).resize();
    return ctx.reply(compileMessage(message), keyboard.extra());
});

settingsPhoneScene.leave((ctx) => ctx.reply("Выберите пожалуйста интересующий Вам раздел", MainKeyboard.extra()));
settingsPhoneScene.hears(/Назад/gi, (ctx) => {
    ctx.scene.reset();
    return ctx.scene.enter("settings");
});

settingsPhoneScene.hears(/в гл\.меню/i, leave());
settingsPhoneScene.command("cancel", leave());

settingsPhoneScene.on("location", async(ctx) => {
    const location = ctx.message.location;
    const [data] = await geocoder.reverse({ lat: location.latitude, lon: location.longitude });
    if (!data) return ctx.reply("Некорректные данные, попробуйте снова");
    return saveAddressAndBackToSettings(ctx, data);
});

settingsPhoneScene.on("text", async(ctx) => {
    const addressText = escape(ctx.message.text);
    const [data] = await geocoder.geocode({ address: addressText, language: "ru" });
    if (!data) return ctx.reply("Некорректные данные, попробуйте снова");
    return saveAddressAndBackToSettings(ctx, data);
});
settingsPhoneScene.on("message", settingsPhoneScene.enterHandler);

async function saveAddressAndBackToSettings(ctx, data) {
    const { formattedAddress: address, latitude, longitude, city } = data;
    let ok = await ClientModel.update({ userId: ctx.from.id }, {
        $set: {
            address,
            city,
            location: { latitude, longitude },
        },
    });

    ctx.replyWithHTML(`Адрес изменен на: <i>${address}</i>`);
    ctx.scene.reset();
    return ctx.scene.enter("settings");
}

module.exports = settingsPhoneScene;