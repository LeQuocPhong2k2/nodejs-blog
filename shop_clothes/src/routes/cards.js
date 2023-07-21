const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cardController = require("../app/controllers/CardController");

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



router.get("/gioHang", cardController.gioHang);

router.post("/store", cardController.Store);

router.delete("/:id", cardController.delete);



module.exports = router;