const Markup = require("telegraf/markup");
const CategoryModel = require("../models/category");

let categories = [];

module.exports = async(ctx) => {
    const message = "Выберите категорию из меню";
    categories = categories.length ? categories : (await CategoryModel.find({}).select("-products"));
    const keyboard = Markup.inlineKeyboard([
        ...categories.map((category) =>
            Markup.callbackButton(category.title, `category:1;${category.id}`)),
    ], { columns: 3 });
    return ctx.reply(message, keyboard.extra());
};