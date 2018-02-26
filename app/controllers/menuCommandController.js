const Markup = require("telegraf/markup");
const CategoryModel = require("../models/category");

let categories = [];

module.exports = async(ctx) => {
    const message = "Выберите категорию из меню";
    categories = categories.length ? categories : (await CategoryModel.find({}).select("-products"));
    const keyboard = Markup.inlineKeyboard([
        Markup.callbackButton(categories[0].title, `category:${categories[0].id}`),
        Markup.callbackButton(categories[1].title, `category:${categories[1].id}`),
    ]);
    return ctx.reply(message, keyboard.extra());
};