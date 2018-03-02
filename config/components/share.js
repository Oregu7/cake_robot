const Markup = require("telegraf/markup");
//const compileMessage = require("../helpers/compileMessage");

exports.MainKeyboard = Markup.keyboard([
    [Markup.button("\u{1F37D}Меню"), Markup.button("\u{1F6CD}Корзина")],
    [Markup.button("\u{2753}Помощь")],
]).resize(true);

exports.StartMessage = `<b>Cake RoBot - </b> это демонстрационный бот магазина по продаже тортиков ヽ(♡‿♡)ノ.

Используйте эти команды, чтобы управлять ботом:

<b>Магазин</b>
/menu — Меню
/cart — Корзина
/history — История заказов
/news — Наши новости и акции

<b>Помощь</b>
/settings — Настройки
/help — Справка
/feedback - связаться с нами
/about — О проекте

<b>Разное</b>
/start — Главное меню
/off — Выключить подписку на бота
/on — Включить подписку на бота

/rate - оценить бот`;