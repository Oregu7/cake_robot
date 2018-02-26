const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    title: { type: String, required: true, index: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Category", CategorySchema);