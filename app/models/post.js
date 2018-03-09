const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    author: { type: Number, required: true },
});

PostSchema.statics.actual = async function() {
    let [post = null] = await this.find({})
        .sort("-created_at")
        .limit(1);

    return post;
};

module.exports = mongoose.model("Post", PostSchema);