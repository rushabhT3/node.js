const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('expense', 'root', 'qwertY@1', {
    dialect: 'mysql',
    host: 'localhost'
  });

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  expense: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = { sequelize, Item };