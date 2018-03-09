const moment = require("moment");
const PostModel = require("../models/post");
const compileMessage = require("../helpers/compileMessage");

moment.locale("ru");

module.exports = async(ctx) => {
    const post = await PostModel.actual();
    if (!post) return ctx.reply("Увы, но пока нет ничего нового ;(");
    const message = `<b>${post.title}</b>
    <code>${moment(post.created_at).format("Do MMMM YYYY")}</code>

    ${post.description}`;

    return ctx.replyWithHTML(compileMessage(message));
};