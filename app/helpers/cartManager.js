const _ = require("lodash");
const { suid } = require("rand-token");
const Markup = require("telegraf/markup");

const ProductModel = require("../models/product");

function getCart(ctx) {
    if (!ctx.session.hasOwnProperty("cart")) ctx.session.cart = {};
    return ctx.session.cart;
}

function getCartSize(ctx) {
    const cart = _.filter(getCart(ctx), (product) => product > 0);
    return _.size(cart);
}

function getProductCount(ctx, id) {
    const cart = getCart(ctx);
    return cart[id] || 0;
}

function productCountInc(ctx, id) {
    const cart = getCart(ctx);
    const product = getProductCount(ctx, id);
    cart[id] = product + 1;
    return cart[id];
}

function productCountDec(ctx, id) {
    const cart = getCart(ctx);
    const product = getProductCount(ctx, id);
    if (product > 0) cart[id] = product - 1;
    return cart[id];
}

function getProductInfo(product) {
    return `${product.name} ${product.weight * 1000}гр./${product.price}руб.`;
}

function createProductKeyboard(product, count = 0) {
    const callbackButtons = [
        [Markup.callbackButton(`${product.weight * 1000}гр./${product.price}руб.\u{2795}`, `addcart:${product.id}`)],
    ];
    if (count > 0) {
        callbackButtons[0].push(Markup.callbackButton(`${count} шт. \u{2796}`, `rmcart:${product.id}`));
        callbackButtons.push([Markup.switchToCurrentChatButton("\u{1F6CD}Открыть корзину", `корзина_#${suid(7)}`)]);
    }
    return Markup.inlineKeyboard(callbackButtons);
}

function createMessageForAnswerCbQuery(product, count, action = "inc") {
    const sign = action == "inc" ? "\u{2795}" : "\u{2796}";
    const emoji = action == "inc" ? "\u{1F60B}" : count > 0 ? "\u{1F641}" : "\u{1F625}";
    const productInfo = getProductInfo(product);

    return `${sign}${productInfo}\nв корзине: ${count} шт. ${emoji}`;
}

function getProductsID(ctx) {
    const cart = getCart(ctx);
    // const products = _.filter(cart, (product) => product > 0);
    return _.map(cart, (count, productID) => {
        return count > 0 ? productID : null;
    }).filter((productID) => !_.isNull(productID));
}

async function getProducts(ctx) {
    const productsID = getProductsID(ctx);
    const products = await ProductModel.find({ _id: { $in: productsID } });
    return products.map((product) => {
        product.count = getProductCount(ctx, product.id);
        return product;
    });
}

module.exports = {
    getCart,
    getCartSize,
    getProductCount,
    getProductsID,
    getProducts,
    getProductInfo,
    productCountInc,
    productCountDec,
    createProductKeyboard,
    createMessageForAnswerCbQuery,
};