const Router = require("telegraf/router");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const cartManager = require("../helpers/cartManager");

const callback = new Router(({ callbackQuery }) => {
    if (!callbackQuery.data) { return; }
    const parts = callbackQuery.data.split(":");
    const result = {
        route: parts[0],
        state: { payload: parts[1] },
    };
    return result;
});

callback.on("category", async(ctx) => {
    const [page, categoryId] = ctx.state.payload.split(";");
    const category = await CategoryModel.findById(categoryId);
    const products = await ProductModel.paginate({ category_id: category._id }, {
        limit: 5,
        page: Number(page),
    });
    ctx.editMessageText(`\u{2B07}${category.title}`);
    for (let product of products.docs) {
        let count = cartManager.getProductCount(ctx, product.id);
        let keyboard = cartManager.createProductKeyboard(product, count);
        let caption = `${product.name}:\n${product.description}`;
        await ctx.replyWithPhoto(product.image, Extra.load({ caption }).markup(keyboard));
    }

    if (products.page < products.pages) {
        let message = `загружено ${products.page * products.limit} из ${products.total} товаров в категории - "${category.title}"`;
        let keyboard = Markup.inlineKeyboard([
            Markup.callbackButton(
                `\u{23EC}загрузить еще "${category.title}"`,
                `category:${products.page+1};${category.id}`),
        ]);
        return ctx.reply(message, keyboard.extra());
    } else {
        let message = `Все ${products.total} товаров из категории - "${category.title}" загружены!\nНажмите: /menu, чтобы продолжить покупки`;
        return ctx.reply(message);
    }
});

callback.on("addcart", async(ctx) => {
    // check cart exist
    const productId = ctx.state.payload;
    const product = await ProductModel.findById(productId);
    // add product
    const count = cartManager.productCountInc(ctx, productId);

    ctx.answerCbQuery(cartManager.createMessageForAnswerCbQuery(product, count), true);
    ctx.editMessageReplyMarkup(cartManager.createProductKeyboard(product, count));
});

callback.on("rmcart", async(ctx) => {
    // check cart exist
    const productId = ctx.state.payload;
    const product = await ProductModel.findById(productId);
    // add product
    const count = cartManager.productCountDec(ctx, productId);

    ctx.answerCbQuery(cartManager.createMessageForAnswerCbQuery(product, count, "dec"), true);
    ctx.editMessageReplyMarkup(cartManager.createProductKeyboard(product, count));
});

module.exports = callback;