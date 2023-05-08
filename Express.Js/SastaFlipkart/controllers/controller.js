const { sequelize, Item } = require("../models/database");

exports.getItems = async (req, res) => {
  const items = await Item.findAll();
  //   console.log(items);
  res.send(items);
};

exports.createItem = async (req, res) => {
  //   console.log(req);
  // extracting the info from the req.body (the body from the show.js): object destructuring
  const { name, category } = req.body;
  const items = await Item.create({ name, category });
  res.send(items);
};

exports.deleteItem = async (req, res) => {
  //   console.log(req);
  const { id } = req.params;
  await Item.destroy({ where: { id } });
  res.send(`item with the ID: ${id} is deleted`);
};

exports.google = async (req, res) => {
  const x = Math.floor(Math.random() * 100);
  // res.send(`your random number is ${x}`);
  res.json(x);
};
