// Class dega isliye capital 'S'
const Sequelize = require('sequelize');
// jo util/database me se export kiya vo yaha pr use hoga 
const sequelize = require('../util/database');
// Product is the model where 'product' is the name and 2nd parameter is the structure of it
const Product = sequelize.define('product', {
  id: {
    // ! Sequelize is the capital below
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// the const Product where the model is defined will be exported
module.exports = Product;

// This code is defining a Product model using the Sequelize library. The model has an id, title, price, imageUrl, and description fields. The id field is the primary key and is set to auto-increment. The price, imageUrl, and description fields are not allowed to be null. The model is then exported for use in other parts of the application.