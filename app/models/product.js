const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: { type: String, required: true, index: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    weight: { type: Number, required: true },
    description: { type: String, default: "" },
});

module.exports = mongoose.model("Product", ProductSchema);