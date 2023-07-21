const Card = require("../models/Card");
const Course = require("../models/Course");
const { mongooseToObjec } = require("../../util/mongoose");
const { mutipleMongooseToObject } = require("../../util/mongoose");


class CardController {
    Store(req, res, next) {
        const card = new Card(req.body);
        card
            .save()
            .then((data) => {
                Course.updateOne({ name: req.body.name }, { quantity: req.body.quantity })
                    .then(() => console.log("ok"))
            })
            .catch((err) => {
                res.status(500).json("loi server");
            });
    }

    delete(req, res, next) {
        Card.delete({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }
    gioHang(req, res, next) {
        Promise.all([
                Card.find({ useridF: req.session.userid }),
                Card.countDocuments({ useridF: req.session.userid }),
            ])
            .then(([courses, count]) =>
                res.render("./card", {
                    count,
                    courses: mutipleMongooseToObject(courses),
                })
            )
            .catch((err) => {
                res.send("không có sản phẩm");
            });
    }
}

module.exports = new CardController();