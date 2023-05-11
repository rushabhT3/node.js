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

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   const foundUser = await User.findOne({ where: { email, password } });
//   if (foundUser) res.status(201).json({ message: "Successfully Signed In" });
// };

exports.random = async (req, res) => {
  res.send("hi this is random");
};
