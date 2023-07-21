const Course = require("../models/Course");
const Card = require("../models/Card");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class MeController {
    //GET me/create/sanpham
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render("me/stored-courses", {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render("me/trash-courses", {
                    courses: mutipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }
    create(req, res, next) {
        res.render("courses/create");
    }
    storedNews(req, res, next) {
        Card.countDocuments({ useridF: req.session.userid.id })
            .then((count) =>
                res.render("./news", {
                    count,
                })
            )
            .catch(next);
    }
}

module.exports = new MeController();