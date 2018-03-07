const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Float = require("mongoose-float").loadType(mongoose);

const OrderSchema = mongoose.Schema({
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    total: { type: Float, required: true },
    date: { type: Date, default: Date.now },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        count: { type: Number, required: true },
    }],
});

OrderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Order", OrderSchema);