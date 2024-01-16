const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
const Project = require('./Project');
const User = require('./User');

const Bug = sequelize.define('Bug', {
    description: Sequelize.TEXT,
    severity: {
        type: Sequelize.STRING,
        validate: {
            isIn: [['slaba', 'medie', 'mare']],
        },
    },
    priority: {
        type: Sequelize.STRING,
        validate: {
            isIn: [['mica', 'medie', 'mare', 'urgent_rau_de_tot']],
        },
    },
    commitLink: Sequelize.STRING,
    bugStatus: {
        type: Sequelize.STRING,
        validate: {
            isIn: [['NEREZOLVAT', 'REZOLVAT']],
        },
    },
    solveLink: Sequelize.STRING,
    assignedMP: Sequelize.STRING,
});


Bug.belongsTo(Project, { foreignKey: 'repository', targetKey: 'repository' });
Bug.belongsTo(User, { foreignKey: 'assignedMP', targetKey: 'email' });

module.exports = Bug;
