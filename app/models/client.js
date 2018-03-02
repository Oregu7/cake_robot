const mongoose = require("mongoose");
const Float = require("mongoose-float").loadType(mongoose, 6);

const ClientSchema = mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    username: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    timezone: { type: String, default: "Europe/Moscow" },
    created_at: { type: Date, default: Date.now },
    notification: { type: Boolean, default: true },
    isBot: { type: Boolean, default: false },
    languageCode: { type: String, default: "ru" },
    location: {
        longitude: Float,
        latitude: Float,
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = mongoose.model("Client", ClientSchema);