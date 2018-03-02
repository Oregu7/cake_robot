const ClientModel = require("../models/client");

module.exports = async(ctx) => {
    const {
        id: userId,
        is_bot: isBot,
        first_name: firstName,
        last_name: lastName,
        username,
        language_code: languageCode,
    } = ctx.from;

    const client = await ClientModel.create({
        userId,
        isBot,
        firstName,
        lastName,
        username,
        languageCode,
    });

    //save state
    ctx.session.authorized = true;
    ctx.session.settings = client;

    return client;
};