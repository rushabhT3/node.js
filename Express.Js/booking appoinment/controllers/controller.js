const { sequelize, User } = require("../models/database");
const path = require("path");

exports.createUser = async (req, res) => {
  try {
    if (!req.body.phone && !req.body.name && !req.body.email) {
      throw new Error("All the information is mandatory");
    }
    const { name, phone, email } = req.body;
    const user = await User.create({ name, phone, email });
    res.send(user);
  } catch (error) {
    console.log("createUser Controller Function: went wrong");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    console.log(users);
    res.send(users);
  } catch (error) {
    console.log("getUsers Controller Function: went wrong");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.send(`User with ID ${id} deleted`);
  } catch (error) {
    console.log("deleteUser Controller Function: went wrong");
  }
};

exports.home = (req, res) => {
  res.send("Home page");
};

exports.about = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/show.html"));
};
