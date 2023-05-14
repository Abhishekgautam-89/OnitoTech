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

exports.subTotals = async (req, res) => {
    try {
        const subTotals = await Sequelize.query('SELECT movies.genres, movies.primaryTitle, SUM(ratings.numVotes) as numVotes FROM movies INNER JOIN ratings on movies.tconst=ratings.tconst GROUP BY movies.genres, movies.primaryTitle WITH ROLLUP')
        // console.log(subTotals);
        if(subTotals.length>0){
        res.status(201).json({ message: "done", data: subTotals[0] });
        }
        else{throw("No Data Found") }
    }
    catch (err) {
        // console.log("subTotal Errors>", err)
        res.status(401).json({ message: err })
    }
}

exports.updateRunTimeMinutes = async (req, res) => {
    try {
        const updateMovies = await Sequelize.query(`UPDATE movies
        SET runtimeMinutes = 
            CASE 
                WHEN genres = 'Documentary' THEN runtimeMinutes + 15
                WHEN genres = 'Animation' THEN runtimeMinutes + 30
                ELSE runtimeMinutes + 45
            END;        
        `)
        if(updateMovies){
        res.status(201).json({ message: "success" })
        }
        if(!updateMovies){
            throw('Something went wrong')
        }
    }
    catch (err) {
        res.status(401).json({ message: err })
    }
}


