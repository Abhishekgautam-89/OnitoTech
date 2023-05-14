const {Router} = require('express');
const router = Router();

const movieController = require('../controllers/movies')

router.get('/longest-duration-movies', movieController.getLongestDurationMovies)


module.exports = router;