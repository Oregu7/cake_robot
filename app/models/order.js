const mongoose = require("mongoose");
const Float = require("mongoose-float").loadType(mongoose);

const OrderSchema = mongoose.Schema({
    total: {
        type: Float,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    data: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        count: { type: Number, required: true },
    }],
});

module.exports = mongoose.model("Order", OrderSchema);