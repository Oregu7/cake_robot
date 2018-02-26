const config = require("config");
const CategoryModel = require("./category");
const ProductModel = require("./product");
const categories = require("./seeds.json");


async function main() {
    for (let category of categories) {
        let { goods, name, title } = category;
        let products = (await ProductModel.create(goods)).map((product) => product._id);
        CategoryModel.create({ name, title, products }).then(console.log);
    }
}

main()
    .catch(console.error);