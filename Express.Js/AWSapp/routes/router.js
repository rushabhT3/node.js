const express = require("express");
const router = express.Router();

const controller = require("../controllers/controller");

router.post("/user/signup", controller.signUp);
router.post("/user/login", controller.login);
router.get("/random", controller.random);

module.exports = router;
