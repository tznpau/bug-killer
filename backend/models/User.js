const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('User', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    role: Sequelize.STRING,
});

module.exports = User;