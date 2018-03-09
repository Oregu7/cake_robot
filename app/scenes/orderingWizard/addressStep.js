const Composer = require("telegraf/composer");
const escape = require("escape-html");
const NodeGeocoder = require("node-geocoder");

const { decorators } = require("./utills");
const { ADDRESS_PROPERTY } = require("./utills").constants;
const { setAddress } = require("./utills").properties;
const { sendStartDeliveryMessage, sendConfirmationMessage } = require("./utills").messages;

const address = new Composer();
const options = {
    provider: "google",

    // Optional depending on the providers
    httpAdapter: "https", // Default
    apiKey: process.env.GEOCODING_API, // for Mapquest, OpenCage, Google Premier
    formatter: null, // "gpx", "string", ...
};

const geocoder = NodeGeocoder(options);
const warningMessage = "Укажите пожалуйста корректный адрес!";
// use decorators
decorators.cancel(address);
decorators.back(address)(sendStartDeliveryMessage);
decorators.next(address)(ADDRESS_PROPERTY, warningMessage, sendConfirmationMessage);

address.on("location", async(ctx) => {
    const location = ctx.message.location;
    const [data] = await geocoder.reverse({ lat: location.latitude, lon: location.longitude });
    if (!data) return ctx.reply(warningMessage);
    const { formattedAddress } = data;
    setAddress(ctx, formattedAddress);
    sendConfirmationMessage(ctx);

    return ctx.wizard.next();
});

address.on("text", async(ctx) => {
    const addressText = escape(ctx.message.text);
    const [data] = await geocoder.geocode({ address: addressText, language: "ru" });
    if (!data) return ctx.reply(warningMessage);
    const { formattedAddress } = data;
    setAddress(ctx, formattedAddress);
    sendConfirmationMessage(ctx);

    return ctx.wizard.next();
});

// default
address.on("message", (ctx) => {
    return ctx.reply(warningMessage);
});

module.exports = address;