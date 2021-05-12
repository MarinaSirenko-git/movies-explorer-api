const router = require('express').Router();
const { celebrate } = require('celebrate');
const celebrateCreateMovieConfig = require('../utils/configs/celebrateCreateMovieConfig');
const celebrateDeleteMovieConfig = require('../utils/configs/celebrateDeleteMovieConfig');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate(celebrateCreateMovieConfig), createMovie);
router.delete('/:movieId', celebrate(celebrateDeleteMovieConfig), deleteMovieById);

module.exports = router;
