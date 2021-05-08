const Movie = require('../models/movie');

const getMovies = (req, res, next) => {
  Movie.find({})
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
        const err = new Error('Переданы некорректные данные при создании фильма');
        err.statusCode = 400;
        next(err);
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
        const err = new Error('Нельзя удалять фильмы других пользователей');
        err.statusCode = 403;
        next(err);
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
      const err = new Error('Фильм не найден');
      err.statusCode = 404;
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
