const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("premiumexpense", "root", "qwertY@1", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { sequelize, User };
