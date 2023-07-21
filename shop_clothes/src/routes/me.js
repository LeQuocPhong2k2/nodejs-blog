const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const meController = require("../app/controllers/MeController");

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

router.get("/stored/courses", meController.storedCourses);
router.get("/trash/courses", meController.trashCourses);

router.get("/stored/news", meController.storedNews);
router.get("/create", meController.create);





module.exports = router;