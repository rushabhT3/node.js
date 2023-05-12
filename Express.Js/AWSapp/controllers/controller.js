const { sequelize, User } = require("../models/database");

exports.signUp = async (req, res) => {
  // const { name, email, password } = req.body;
  // await User.create({ name, email, password });
  // res.status(201).json({ message: "Successfully created new user:)" });
  try {
    const { name, email, password } = req.body;
    if (!name && email && password) {
      return res
        .status(400)
        .json({ error: "bad parameters: something is missing" });
    } else {
      await User.create({ name, email, password });
      res.status(201).json({ message: "Successfully created new user:)" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ where: { email } });
    if (foundUser) {
      if (foundUser.password == password) {
        res.status(200).json({ message: "Successfully Logged In" });
      } else {
        res.status(401).json({ message: "User not authorized" });
      }
    } else {
      // Redirect the user to the signup page
      // res.redirect("../public/signUp/signUp.html");
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("login error");
    res.status(500).json({ message: error });
  }
};

exports.random = async (req, res) => {
  res.send("hi this is random");
};
