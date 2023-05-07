const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('haha', 'root', 'qwertY@1', {
  dialect: 'mysql',
  host: 'localhost'
});

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
}, {
  // other things
});


module.exports = { sequelize, User };

