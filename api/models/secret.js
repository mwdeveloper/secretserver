const mongoose = require("mongoose");
const md5 = require("md5");

const Schema = mongoose.Schema;

const secretSchema = new Schema({
    hash: {type: String, required: true},
    secretText: {type: String, required: true},
    remainingViews: {type: Number, required: true, min: 0},
    createdAt: {type: Date, required: true, default: Date.now},
    expiresAt: {type: Date, required: true}
}, {
    timestamps: true,
});

secretSchema.methods.setHash = function (secretText) {
    this.hash = md5(secretText);
};
module.exports = mongoose.model("Secret", secretSchema);
