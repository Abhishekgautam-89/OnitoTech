const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database')
const movies = require('./model/movies')
const ratings = require('./model/ratings')
// const sequelize = require('./model/movies')

////////////////////////////////////////---Routes---//////////////////////////////////////////////////////////////////////////////
const movieRoutes = require('./routes/moviesRoutes')

///////////////////////////////////////---Relation---//////////////////////////////////////////////////////////////////////////////

movies.hasOne(ratings)
ratings.belongsTo(movies)

const app = express();
app.use(bodyParser.json({extended: false}));

app.use('/v1', movieRoutes)

app.use('/',(req,res)=>{
    res.send ('Server is running on 1000')
})

sequelize
.sync()
// .sync({force:true})
// .sync({alter:true})
.then(app.listen(1000))
.catch(err=>{console.log("sequelize error", err)})