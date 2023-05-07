const { sequelize, Item } = require("../models/database");

exports.createUser = async (req, res) => {
  try {
    if (!req.body.expense && !req.body.category && !req.body.description) {
      throw new Error("All the information is mandatory");
    }
    const { expense, category, description } = req.body;
    const user = await Item.create({ expense, category, description });
    res.send(user);
  } catch (error) {
    console.log("createUser Controller Function: went wrong");
    console.log(error);
  }
};

exports.getUsers = async (req, res) => {
    try {
      const users = await Item.findAll();
      console.log(users);
      res.send(users);
    } catch (error) {
      console.log("getUsers Controller Function: went wrong");
      console.log(error);
    }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Item.destroy({ where: { id } });
    res.send(`Item with ID ${id} deleted`);
  } catch (error) {
    console.log("deleteUser Controller Function: went wrong");
    console.log(error);
  }
};

exports.getHello = (req, res) => {
  res.send("Hello there");
};

exports.getRandomNumber = (req, res) => {
    const randomNumber = Math.floor(Math.random() * 100);
    res.send(`Your random number is: ${randomNumber}`);
};
