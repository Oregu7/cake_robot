const Extra = require("telegraf/extra");
const { isMongoId } = require("validator");
const ProductModel = require("../../models/product");
const { createProductKeyboard, getProductCount } = require("../../helpers/cartManager");

module.exports = async(ctx) => {
    const [, productId] = ctx.message.text.split(" ");
    const product = isMongoId(productId) ? (await ProductModel.findById(productId)) : null;
    if (product) {
        const count = getProductCount(ctx, product.id);
        const keyboard = createProductKeyboard(product, count);
        const caption = `${product.name}:\n${product.description}`;
        ctx.replyWithPhoto(product.image, Extra.load({ caption }).markup(keyboard));
    } else {
        ctx.reply("Я не нашел продукт с данным идентификатором!");
    }
};