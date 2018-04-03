const compileMessage = require("../helpers/compileMessage");

const helpUrl = "http://telegra.ph/Instrukciya-ispolzovaniya-04-02";
const botName = "@botodojo_bot";

module.exports = (ctx) => {
    const message = `Мы рекомендуем Вам изучить ответы на вопросы в <a href="${helpUrl}">справке</a>.
    Это позволит избежать недоразумений при использовании бота. Если же Вы изучили справку, но не нашли ответа на возникший вопрос, Вы всегда сможете обратиться в нашу техподдержку используя ${botName}.
    
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

    return ctx.replyWithHTML(compileMessage(message));
};