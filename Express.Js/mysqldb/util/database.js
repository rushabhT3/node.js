const Sequelize = require('sequelize');
// Sequelize will be the class

const sequelize = new Sequelize('node-complete', 'root', 'qwertY@1', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;