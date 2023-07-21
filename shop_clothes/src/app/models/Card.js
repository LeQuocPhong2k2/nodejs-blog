const mongoose = require("mongoose");
const mongooseDeleted = require("mongoose-delete");
const Schema = mongoose.Schema;

const Card = new Schema({
    useridF: { type: String },
    name: { type: String },
    size: { type: String },
    price: { type: String },
    quantity: { type: String },
    quantityOrder: { type: String },
    img: { type: String },
}, {
    timestamps: true,
});
//Add plugin
Card.plugin(mongooseDeleted, {
    deletedAt: true,
    overrideMethods: true,
});
module.exports = mongoose.model("cards", Card);