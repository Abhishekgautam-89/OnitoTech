const {Router} = require('express');
const router = Router();

const movieController = require('../controllers/movies')

router.get('/longest-duration-movies', movieController.getLongestDurationMovies)
router.post('/new-movie', movieController.newMovie)
router.get('/top-rated-movies', movieController.getTopRatedMovies);


module.exports = router;