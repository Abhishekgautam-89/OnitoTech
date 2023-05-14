const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const Movies = sequelize.define('movie',{
    tconst: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    titleType:{
        type: Sequelize.STRING
    },
    primaryTitle: {
        type: Sequelize.STRING
    },
    runtimeMinutes:{
        type: Sequelize.INTEGER
    },
    genres:{
        type:Sequelize.STRING
    },
    createdAt:{
        type: Sequelize.DATE,
        default: new Date()
    },
    updatedAt:{
        type: Sequelize.DATE,
        default: new Date()
    }
})

module.exports = Movies