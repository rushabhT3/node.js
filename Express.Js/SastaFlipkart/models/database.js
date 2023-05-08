const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("restaurant", "root", "qwertY@1", {
  dialect: "mysql",
  host: "localhost",
});

const Item = sequelize.define("Item", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = { sequelize, Item };
