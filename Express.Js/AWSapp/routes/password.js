const express = require("express");
const router = express.Router();

const { SibApiV3Sdk } = require("@sendinblue/client");

const passwordController = require("../controllers/password");

router.get(
  "/updatepassword/:resetpasswordid",
  passwordController.updatepassword
);

router.get("/resetpassword/:id", passwordController.resetpassword);

router.use("/forgotpassword", passwordController.forgotpassword);

module.exports = router;
