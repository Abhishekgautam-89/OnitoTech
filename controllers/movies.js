const Movies = require('../model/movies');
const Ratings = require('../model/ratings')
const Sequelize = require('../util/database');
const { QueryTypes } = require('sequelize');

exports.getLongestDurationMovies = async (req, res) => {
    // Ratings.authenticate()
    try {
        const movies = await Movies.findAll({
            attributes: ['tconst', 'primaryTitle', 'runtimeMinutes', 'genres'],
            order: [['runtimeMinutes', 'DESC']],
            limit: 10
        })
        res.status(201).json({ data: movies })
    }
    catch (err) {
        console.log('Error for Get Longest Duration Movies', err)
        res.status(401).json({ data: err })
    }
}




