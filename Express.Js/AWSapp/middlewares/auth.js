const jwt = require("jsonwebtoken"); // ? This imports the jwt library which helps us work with tokens

const User = require("../models/users");

exports.authenticate = async (req, res, next) => {
  // console.log(token);
  const token = req.header("Authorization"); // ? This gets the token from the request header
  const user = jwt.verify(token, "secretkey"); // ? This checks if the token is real using a secret key
  const foundUser = await User.findByPk(user.userId); // ? This looks up the user's information using their ID
  console.log(JSON.stringify(foundUser));
  req.foundUser = foundUser; // ? This adds the user's information to the request so we can use it later
  next(); // This lets the person go to the next page
};
