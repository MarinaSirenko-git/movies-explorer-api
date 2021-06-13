const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-req-error');
const ForbiddenError = require('../errors/forbidden-error');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      } else {
        next(e);
      }
    });
};

const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  const currentUser = req.user._id;
  Movie.findById(movieId)
    .then((movie) => {
      const owner = movie.owner.toString();
      if (owner !== currentUser) {
        next(new ForbiddenError('Нельзя удалять фильмы других пользователей'));
      }
      return movie;
    })
    .then((movie) => {
      Movie.findOneAndRemove({ _id: movie._id })
        .then((userMovie) => {
          res.send(userMovie);
        })
        .catch(next);
    })
    .catch(() => {
      next(new BadRequestError('Фильм не найден'));
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
