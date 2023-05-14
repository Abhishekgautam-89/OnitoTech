const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Ratings = sequelize.define('ratings', {
    tconst: {
        type: Sequelize.STRING,
        foreignKey: true,
        allowNull: false
    },
    averageRating:{
        type: Sequelize.DOUBLE
    },
    numVotes: {
        type: Sequelize.INTEGER
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

module.exports = Ratings;