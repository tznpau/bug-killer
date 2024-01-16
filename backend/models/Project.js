const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Project = sequelize.define('Project', {
  repository: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  team: Sequelize.STRING,
});

module.exports = Project;