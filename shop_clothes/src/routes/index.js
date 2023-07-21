const siteRouter = require('./site');
const meRouter = require("./me");
const courseRouter = require("./courses");
const cardRouter = require("./cards");
const jwt = require("jsonwebtoken");

function route(app) {

    var checkLogin = function(req, res, next) {
        try {
            var token = req.cookies.token;
            var ketqua = jwt.verify(token, "mk");
            if (ketqua) {
                next();
            }
        } catch (err) {
            return res.redirect("/login");
        }
    };

    app.use("/me", checkLogin, meRouter);

    app.use("/cards", checkLogin, cardRouter);

    app.use("/courses", checkLogin, courseRouter);

    app.use('/', siteRouter);

}

module.exports = route;