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
});

ClientSchema.virtual("orders", {
    ref: "Order",
    localField: "_id",
    foreignField: "client_id",
});

ClientSchema.statics.getClientOrCreate = async function(ctx) {
    const { id: userId } = ctx.from;
    const client = await this.findOne({ userId });
    if (client) return client;

    const {
        is_bot: isBot,
        first_name: firstName,
        last_name: lastName,
        username,
        language_code: languageCode,
    } = ctx.from;

    const newClient = await this.create({
        userId,
        isBot,
        firstName,
        lastName,
        username,
        languageCode,
    });

    return newClient;
};

module.exports = mongoose.model("Client", ClientSchema);