const Extra = require("telegraf/extra");
const compileMessage = require("../helpers/compileMessage");
const { MainKeyboard } = require("./share");

module.exports = (ctx) => {
    const message = `<b>Cake RoBot - </b> это демонстрационный бот магазина по продаже тортиков ヽ(♡‿♡)ノ.
    
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

    return ctx.reply(compileMessage(message), Extra.HTML().markup(MainKeyboard));
};