const Router = require("telegraf/router");
const Extra = require("telegraf/extra");
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
    const category = await CategoryModel.findById(ctx.state.payload).populate("products");
    ctx.editMessageText(`\u{2B07}${category.title}`);
    for (let product of category.products) {
        let count = cartManager.getProductCount(ctx, product.id);
        let keyboard = cartManager.createProductKeyboard(product, count);
        let caption = `${product.name}:\n${product.description}`;
        ctx.replyWithPhoto(product.image, Extra.load({ caption }).markup(keyboard));
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