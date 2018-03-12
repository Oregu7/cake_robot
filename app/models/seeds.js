const config = require("config");
const CategoryModel = require("./category");
const ProductModel = require("./product");
const PostModel = require("./post");
const categories = require("./seeds.json");


async function main() {
    for (let category of categories) {
        let { goods, name, title } = category;
        let { _id: category_id } = await CategoryModel.create({ name, title });
        let products = await ProductModel.create(
            goods.map(
                (product) => Object.assign({}, product, { category_id })
            )
        );

        console.log(products);
    }
}

main()
    .catch(console.error);

/*function posts() {
    return PostModel.create({
        title: "Прокачате свой бизнес с помощью ботов \u{1F916}",
        description: "Для оформления заявки заполните форму на нашем сайте: http://tele-bots.mya5.ru/",
        author: 322349523,
    });
}

posts().then(console.log);*/