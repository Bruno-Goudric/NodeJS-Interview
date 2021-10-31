const Sequelize = require('sequelize');
const database = require('../config/db.js');

const Client = database.define('client', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gener: {
        type: Sequelize.STRING
    },
    dt_birthday: {
        type: Sequelize.DATE
    },
    age: {
        type: Sequelize.INTEGER
    },
    city: {
        type: Sequelize.STRING
    }


})

module.exports = Client;