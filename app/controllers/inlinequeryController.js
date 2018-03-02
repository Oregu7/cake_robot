const { uid } = require("rand-token");
const cartManager = require("../helpers/cartManager");

module.exports = async(ctx) => {
    let sumTotal = 0;
    const products = (await cartManager.getProducts(ctx)).map((product) => {
        let sum = product.count * product.price;
        sumTotal += sum;
        let result = {
            id: uid(7),
            type: "article",
            thumb_url: product.image,
            title: cartManager.getProductInfo(product),
            description: `кол-во: ${product.count} шт.\nсумма: ${sum} руб.`,
            message_text: `/product ${product.id}`,
        };

        return result;
    });

    const results = [
        ...products,
        {
            id: "buy",
            type: "article",
            thumb_url: "https://cdn3.iconfinder.com/data/icons/cat-force/256/cat_cart.png",
            title: "ОФОРМИТЬ ЗАКАЗ",
            description: `В корзине: ${cartManager.getCartSize(ctx)} шт.\nИтого: ${sumTotal} руб.`,
            // caption: manga.description.slice(0, 195) + "...",
            message_text: "/pay",
        },
        {
            id: "clear",
            type: "article",
            thumb_url: "https://cdn0.iconfinder.com/data/icons/Hand_Drawn_Web_Icon_Set/128/trash_delete.png",
            title: "ОЧИСТИТЬ КОРЗИНУ",
            description: "Удалить все товары из корзины",
            // caption: manga.description.slice(0, 195) + "...",
            message_text: "/clearcart",
        },
    ];

    const extra = {
        is_personal: true,
        cache_time: 1,
        switch_pm_text: `ОФОРМИТЬ ЗАКАЗ (итого ${sumTotal} руб)\u{27A1}`,
        switch_pm_parameter: "buy",
    };


    ctx.answerInlineQuery(results, extra);
};