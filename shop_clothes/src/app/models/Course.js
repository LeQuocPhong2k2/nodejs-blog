const mongoose = require('mongoose');
const mongooseDeleted = require('mongoose-delete');
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String },
    type: { type: String },
    quantity: { type: String },
    price: { type: Number },
    imga: {
        color: { type: String },
        img: { type: String },
    },
    imgb: {
        color: { type: String },
        img: { type: String },
    },
    imgc: {
        color: { type: String },
        img: { type: String },
    },
    material: { type: String },
    sex: { type: String },
    slug: { type: String },
}, {
    timestamps: true,
});
//Add plugin
Course.plugin(mongooseDeleted, {
    deletedAt: true,
    overrideMethods: true
});

module.exports = mongoose.model('courses', Course);