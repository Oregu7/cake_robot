const mongoose = require("mongoose");
const shortid = require("shortid");

const ProductSchema = mongoose.Schema({
    name: { type: String, required: true, index: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    weight: { type: Number, required: true },
    description: { type: String, default: "" },
    category_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    publicId: { type: String, default: shortid.generate },
});

module.exports = mongoose.model("Product", ProductSchema);