const { sequelize, Item } = require("../models/database");

exports.getItems = async (req, res) => {
  const x = await Item.findAll();
  res.send(x);
};

exports.createItem = async (req, res) => {
  const { name, price } = req.body;
  const x = await Item.create({ name, price });
  res.send(x);
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  await Item.destroy({ where: { id } });
  res.send(`Item with ID ${id} is deleted`);
};

exports.random = async (req, res) => {
  try {
    res.json("hi there");
  } catch (error) {
    console.log("controller error", error);
  }
};
