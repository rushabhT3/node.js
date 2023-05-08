const express = require("express");
const router = express.Router();

const controller = require("../controllers/controller");

router.get("/random", controller.random);
router.get("/getItems", controller.getItems);
router.post("/createItem", controller.createItem);
router.delete("/deleteItem/:id", controller.deleteItem);

module.exports = router;
