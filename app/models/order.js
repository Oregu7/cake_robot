const mongoose = require("mongoose");
const randomatic = require("randomatic");
const mongoosePaginate = require("mongoose-paginate");
const Float = require("mongoose-float").loadType(mongoose);

const OrderSchema = mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    publicId: { type: Number, default: () => randomatic("0", 9) },
    sumTotal: { type: Float, required: true },
    delivery: { type: String, required: true },
    firstName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, default: "" },
    status: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        count: { type: Number, required: true },
    }],
});

OrderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Order", OrderSchema);