const Markup = require("telegraf/markup");

exports.MainKeyboard = Markup.keyboard([
    [Markup.button("\u{1F37D}Меню"), Markup.button("\u{1F6CD}Корзина")],
    [Markup.button("\u{1F4E6}Мои заказы"), Markup.button("\u{2699}Настройки")],
    [Markup.button("\u{2753}Помощь")],
]).resize(true);

exports.StartMessage = `<b>Cake RoBot - </b> это демонстрационный бот магазина по продаже тортиков ヽ(♡‿♡)ノ.

Используйте эти команды, чтобы управлять ботом:

<b>Магазин</b>
/start — Главное меню
/menu — Меню
/cart — Корзина
/history — История заказов
/news — Наши новости и акции

<b>Помощь</b>
/settings — Настройки
/help — Справка
/feedback - связаться с нами`;