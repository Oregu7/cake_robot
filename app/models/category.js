const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    title: { type: String, required: true, index: true },
});

CategorySchema.virtual("products", {
    ref: "Product",
    localField: "_id",
    foreignField: "category_id",
});

module.exports = mongoose.model("Category", CategorySchema);