const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/db_shopmeme", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const user = new Schema({
    user: String,
    password: String,
    email: String,
    add: String,
}, {
    collection: "users",
});
const UserModel = mongoose.model("users", user);

module.exports = UserModel;