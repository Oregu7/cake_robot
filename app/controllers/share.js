const Markup = require("telegraf/markup");

exports.MainKeyboard = Markup.keyboard([
    [Markup.button("\u{1F37D}Меню"), Markup.button("\u{1F6CD}Корзина")],
    [Markup.button("\u{2753}Помощь")],
]).resize(true);