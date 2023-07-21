const Course = require("../models/Course");
const Card = require("../models/Card");

const { mongooseToObjec } = require("../../util/mongoose");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class CourseController {
    //show san pham chi tiet
    show(req, res, next) {
        try {
            Promise.all([
                    Course.findOne({ slug: req.params.slug }),
                    Card.countDocuments({ useridF: req.session.userid }),
                ])
                .then(([course, count]) =>
                    res.render("courses/show", {
                        count,
                        course: mongooseToObjec(course),
                    })
                )
                .catch((err) => {
                    res.send("không có sản phẩm");
                });
        } catch (e) {
            res.send("Sign in again");
        }


    }
    create(req, res, next) {
            res.render("courses/create");
        }
        //insert database
    store(req, res, next) {
            const course = new Course(req.body);
            course
                .save()
                .then(() => res.redirect("/me/stored/courses"))
                .catch(next);
        }
        //sắp xếp
    sort(req, res, next) {
        const sort = { priceTwo: 1 };
        Course.find({})
            .sort(sort)
            .then((course) => {
                res.render("courses/sort", {
                    courses: mutipleMongooseToObject(course),
                });
            })
            .catch(next);
    }
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render("courses/edit", { course: mongooseToObjec(course) })
            )
            .catch(next);
    }
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect("/me/stored/courses"))
            .catch(next);
    }
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }


}

module.exports = new CourseController();