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

exports.newMovie = async (req, res)=>{
    try {
                
        const newMovie = await Sequelize.query(`INSERT INTO movies (tconst, titleType, primaryTitle, runtimeMinutes, genres) VALUES ('${req.body.tconst}', '${req.body.titleType}', '${req.body.primaryTitle}', '${req.body.runtimeMinutes}', '${req.body.genres}')`)
        
        const ratings = await Sequelize.query(`INSERT INTO ratings (tconst, averageRating, numVotes) VALUES ('${req.body.tconst}', '${req.body.averageRating}', '${req.body.numVotes}')`)

        console.log(newMovie, ratings)
        if(newMovie.length>0 && ratings.length>0){
            
            res.status(201).json({message: "Success" });
        }
        else{
            throw('Something went wrong');
        }
        
    }
    catch(err){
        res.status(401).json({data:err})
    }
}

exports.getTopRatedMovies = async (req, res) => {
    try {
        const movies = await Sequelize.query('SELECT movies.tconst, primaryTitle, genres, averageRating FROM movies INNER JOIN ratings ON movies.tconst = ratings.tconst WHERE averageRating>6 ORDER BY averageRating DESC')
        // console.log(movies);
        if(movies.length>0){
            res.status(201).json({data: movies})
        }
        else{
            throw("No Movies Found")
        }

    }
    catch (err) {
        res.status(401).json({ message: err });
    }
}


