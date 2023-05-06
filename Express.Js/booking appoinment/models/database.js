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
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
}, {
  indexes: [
      {
          unique: true,
          fields: ['id', 'email', 'phone']
      }
  ]
});


module.exports = { sequelize, User };

