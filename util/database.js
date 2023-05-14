const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASENAME, process.env.DATABASEUSERID, process.env.DATABASEUSERPASSWORD,{
    dialect: 'mysql',
    host: process.env.DATABASEHOST
    
})

module.exports = sequelize;