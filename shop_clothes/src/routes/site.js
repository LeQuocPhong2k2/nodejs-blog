const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const siteController = require('../app/controllers/SiteController');
const Users = require("../app/models/User");

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

router.get("/login", siteController.login);

router.post("/login", siteController.loginPost);

router.get("/sign-up", siteController.signUp);

router.post("/sign-up", siteController.register);


//collect san pham
router.post("/collect", siteController.collect);

router.get("/collectSort", siteController.collectSort);

router.post("/collectColor", siteController.collectColor);

router.get("/collectSortColor", siteController.collectSortColor);

router.post("/collectPrice", siteController.collectPrice);

router.get("/collectSortPrice", siteController.collectSortPrice);



//collect color home
router.get("/getcollectSortColorHome", siteController.getcollectSortColorHome);

router.post("/postcollectColorHome", siteController.postcollectColorHome);

//search
router.post("/postSearch", siteController.postSearch);

router.get("/getSearch", siteController.getSearch);



router.get("/sanpham/ttnam", checkLogin, siteController.ttnam);

router.get("/sanpham/ttnu", checkLogin, siteController.ttnu);

router.get("/sanpham", checkLogin, siteController.sanpham);

router.use('/home', checkLogin, siteController.home);








module.exports = router;