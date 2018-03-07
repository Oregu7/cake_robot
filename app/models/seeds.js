const config = require("config");
const CategoryModel = require("./category");
const ProductModel = require("./product");
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