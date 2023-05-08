const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("dusratry", "root", "qwertY@1", {
  dialect: "mysql",
  host: "localhost",
});

const Item = sequelize.define(
  "Item",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = { sequelize, Item };
