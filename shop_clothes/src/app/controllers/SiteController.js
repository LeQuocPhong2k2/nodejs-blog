const Course = require("../models/Course");
const Users = require("../models/User");
const Card = require("../models/Card");
const jwt = require("jsonwebtoken");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
    home(req, res, next) {
        try {
            Promise.all([
                    Course.find({}),
                    Card.countDocuments({ useridF: req.session.userid }),
                ])
                .then(([courses, count]) =>
                    res.render("home", {
                        count,
                    })
                )
                .catch(next);
        } catch (e) {
            res.send("Sign in again");
        }
    }

    sanpham(req, res, next) {
        Promise.all([
                Course.find({}),
                Card.countDocuments({ useridF: req.session.userid }),
            ])
            .then(([courses, count]) =>
                res.render("sanpham", {
                    count,
                    courses: mutipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }
    ttnam(req, res, next) {
        try {
            Promise.all([
                    Course.find({ sex: "nam" }),
                    Card.countDocuments({ useridF: req.session.userid }),
                ])
                .then(([courses, count]) =>
                    res.render("ttnam", {
                        count,
                        courses: mutipleMongooseToObject(courses),
                    })
                )
                .catch(next);
        } catch (e) {
            res.send("Sign in again");
        }
    }

    ttnu(req, res, next) {
        try {
            Promise.all([
                    Course.find({ sex: "nu" }),
                    Card.countDocuments({ useridF: req.session.userid }),
                ])
                .then(([courses, count]) =>
                    res.render("ttnu", {
                        count,
                        courses: mutipleMongooseToObject(courses),
                    })
                )
                .catch(next);
        } catch (e) {
            res.send("Sign in again");
        }
    };
    //collect san pham
    collectSort(req, res, next) {
        var ok = req.session.type;

        var sex = req.session.sex;

        if (sex == "nu") {
            Course.find({ $and: [{ type: ok }, { sex: "nu" }] })
                .then((course) => {
                    res.render("ttnu", {
                        courses: mutipleMongooseToObject(course),
                    });
                })
                .catch((err) => {
                    res.send("không có sản phẩm");
                });
        } else if (sex == "nam") {
            Course.find({ $and: [{ type: ok }, { sex: "nam" }] })
                .then((course) => {
                    res.render("ttnam", {
                        courses: mutipleMongooseToObject(course),
                    });
                })
                .catch((err) => {
                    res.send("không có sản phẩm");
                });
        }
    }

    collectSortColor(req, res, next) {
        var ok = req.session.color;

        var sex = req.session.sex;

        if (sex == "nam") {
            Course.find({
                    $and: [{
                            $or: [
                                { "imga.color": ok },
                                { "imgb.color": ok },
                                { "imgc.color": ok },
                            ],
                        },
                        { sex: "nam" },
                    ],
                })
                .then((course) => {
                    res.render("ttnam", {
                        courses: mutipleMongooseToObject(course),
                    });
                })
                .catch((err) => {
                    res.send("không có sản phẩm");
                });
        } else if (sex == "nu") {
            Course.find({
                    $and: [{
                            $or: [
                                { "imga.color": ok },
                                { "imgb.color": ok },
                                { "imgc.color": ok },
                            ],
                        },
                        { sex: "nu" },
                    ],
                })
                .then((course) => {
                    res.render("ttnu", {
                        courses: mutipleMongooseToObject(course),
                    });
                })
                .catch((err) => {
                    res.send("không có sản phẩm");
                });
        }
    };

    collectSortPrice(req, res, next) {
        var ok = req.session.price;

        var sex = req.session.sex;

        if (sex == "nu") {
            if (ok == 100000) {
                Course.find({ $and: [{ price: { $lt: 100000 } }, { sex: "nu" }] })
                    .then((course) => {
                        res.render("ttnu", {
                            courses: mutipleMongooseToObject(course),
                        });
                    })
                    .catch((err) => {
                        res.send("không có sản phẩm");
                    });
            } else if (ok == 200000) {
                Course.find({
                        $and: [{
                                $and: [
                                    { price: { $lte: 200000 } },
                                    { price: { $gte: 100000 } },
                                ],
                            },
                            { sex: "nu" },
                        ],
                    })
                    .then((course) => {
                        res.render("ttnu", {
                            courses: mutipleMongooseToObject(course),
                        });
                    })
                    .catch((err) => {
                        res.send("không có sản phẩm");
                    });
            } else if (ok == 300000) {
                Course.find({
                        $and: [{
                                $and: [
                                    { price: { $lte: 300000 } },
                                    { price: { $gte: 200000 } },
                                ],
                            },
                            { sex: "nu" },
                        ],
                    })
                    .then((course) => {
                        res.render("ttnu", {
                            courses: mutipleMongooseToObject(course),
                        });
                    })
                    .catch((err) => {
                        res.send("không có sản phẩm");
                    });
            } else {
                Course.find({
                        $and: [{ price: { $gt: 300000 } }, { sex: "nu" }],
                    })
                    .then((course) => {
                        res.render("ttnu", {
                            courses: mutipleMongooseToObject(course),
                        });
                    })
                    .catch((err) => {
                        res.send("không có sản phẩm");
                    });
            }
        } else if (sex == "nam") {
            if (ok == 100000) {
                Course.find({ $and: [{ price: { $lt: 100000 } }, { sex: "nam" }] })
                    .then((course) => {
                        res.render("ttnam", {
                            courses: mutipleMongooseToObject(course),
                        });
                    })
                    .catch((err) => {
                        res.send("không có sản phẩm");
                    });
            } else if (ok == 200000) {
                Course.find({
                        $and: [{
                                $and: [
                                    { price: { $lte: 200000 } },
                                    { price: { $gte: 100000 } },
                                ],
                            },
                            { sex: "nam" },
                        ],
                    })
                    .then((course) => {
                        res.render("ttnam", {
                            courses: mutipleMongooseToObject(course),
                        });
                    })
                    .catch((err) => {
                        res.send("không có sản phẩm");
                    });
            } else if (ok == 300000) {
                Course.find({
                        $and: [{
                                $and: [
                                    { price: { $lte: 300000 } },
                                    { price: { $gte: 200000 } },
                                ],
                            },
                            { sex: "nam" },
                        ],
                    })
                    .then((course) => {
                        res.render("ttnam", {
                            courses: mutipleMongooseToObject(course),
                        });
                    })
                    .catch((err) => {
                        res.send("không có sản phẩm");
                    });
            } else {
                Course.find({
                        $and: [{ price: { $gt: 300000 } }, { sex: "nam" }],
                    })
                    .then((course) => {
                        res.render("ttnam", {
                            courses: mutipleMongooseToObject(course),
                        });
                    })
                    .catch((err) => {
                        res.send("không có sản phẩm");
                    });
            }
        }
    }

    collectPrice(req, res, next) {
        req.session.price = req.body.price;

        req.session.sex = req.body.sex;

        res.send(req.session.price);

        res.send(req.session.sex);
    }

    collectColor(req, res, next) {
        req.session.color = req.body.color;

        req.session.sex = req.body.sex;

        res.send(req.session.color);

        res.send(req.session.sex);
    }

    collect(req, res, next) {
        req.session.type = req.body.type;

        req.session.sex = req.body.sex;

        res.send(req.session.type);

        res.send(req.session.sex);
    };

    //collect color home
    getcollectSortColorHome(req, res, next) {
        var ok = req.session.color;
        Course.find({
                $or: [{ "imga.color": ok }, { "imgb.color": ok }, { "imgc.color": ok }],
            })
            .then((course) => {
                res.render("sanpham", {
                    courses: mutipleMongooseToObject(course),
                });
            })
            .catch((err) => {
                res.send("không có sản phẩm");
            });
    };

    postcollectColorHome(req, res, next) {
        req.session.color = req.body.color;

        res.send(req.session.color);
    };
    //search
    postSearch(req, res, next) {
        req.session.search = req.body.search;

        res.send(req.session.search);
    };
    getSearch(req, res, next) {
        var ok = req.session.search;
        Course.find({ name: { $regex: ok } })
            .then((course) => {
                res.render("sanpham", {
                    courses: mutipleMongooseToObject(course),
                });
            })
            .catch((err) => {
                res.send("không có sản phẩm");
            });
    };
    //login
    login(req, res, next) {
        res.render("login");
    }
    loginPost(req, res, next) {
        var user = req.body.user;
        var password = req.body.password;

        Users.findOne({
                user: user,
                password: password,
            })
            .then((data) => {
                if (data) {
                    var token = jwt.sign({
                            _id: data._id,
                        },
                        "mk"
                    );
                    req.session.userid = data._id;

                    return res.json({
                        message: "thanh cong",
                        token: token,
                        userid: data._id,
                        email: data.email,
                        add: data.add,
                    });
                } else {
                    return res.json(req.body);
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json("loi server");
            });
    }
    signUp(req, res, next) {
        res.render("signup");
    }
    register(req, res, next) {
        Users.findOne({ user: req.body.user }).then((data) => {
            if (data) {
                res.json("tai khoan ton tai");
            } else {
                const user = new Users(req.body);
                user
                    .save()
                    .then(() => res.redirect("/login"))
                    .catch(next);
            }
        });
    }
}

module.exports = new SiteController();