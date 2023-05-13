const { Sequelize, DataTypes } = require("sequelize");
const sequelize2 = new Sequelize("premiumexpense", "root", "qwertY@1", {
  host: "localhost",
  dialect: "mysql",
});

const dailyExpense = sequelize2.define("dailyExpense", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
});

module.exports = { sequelize2, dailyExpense };
