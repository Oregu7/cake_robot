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

settingsPhoneScene.enter((ctx) => {
    const message = `Ваш адрес: ${ctx.session.settings.address || "\u{1F4DD}"}

    Вы можете просто отправить Геолокацию.
    Или написать адрес в формате: Город, ул д`;
    const keyboard = Markup.keyboard([
        [Markup.locationRequestButton("Отправить Адрес \u{1F4CD}")],
        [Markup.button("Начало"), Markup.button("Назад")],
    ]).resize();
    return ctx.reply(compileMessage(message), keyboard.extra());
});

settingsPhoneScene.leave((ctx) => ctx.reply("Выберите пожалуйста интересующий Вам раздел", MainKeyboard.extra()));
settingsPhoneScene.hears(/Назад/gi, (ctx) => {
    ctx.scene.reset();
    return ctx.scene.enter("settings");
});

settingsPhoneScene.hears(/Начало/gi, leave());
settingsPhoneScene.command("cancel", leave());

settingsPhoneScene.on("location", (ctx) => {
    const location = ctx.message.location;
    geocoder.reverse({ lat: location.latitude, lon: location.longitude }, function(err, data) {
        console.log(data);
    });

});

settingsPhoneScene.on("text", (ctx) => {
    const address = escape(ctx.message.text);
    geocoder.geocode({ address, language: "ru" }, function(err, data) {
        console.log(data);
    });
});
settingsPhoneScene.on("message", settingsPhoneScene.enterHandler);

module.exports = settingsPhoneScene;