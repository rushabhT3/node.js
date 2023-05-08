const express = require("express");
const router = express.Router();

const controller = require("../controllers/controller");

router.get("/getItems", controller.getItems);
router.post("/createItem", controller.createItem);
router.delete("/deleteItem/:id", controller.deleteItem);
router.get("/google", controller.google);

module.exports = router;
