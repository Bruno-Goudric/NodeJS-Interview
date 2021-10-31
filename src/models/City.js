const Sequelize = require('sequelize');
const database = require('../config/db.js');

const City = database.define('city', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: Sequelize.STRING
    }
})
 
module.exports = City;