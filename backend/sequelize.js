const Sequelize = require('sequelize');

const sequelize = new Sequelize('bug_tracker_db', 'bug_tracker_user', '1234', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;