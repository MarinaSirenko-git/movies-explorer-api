const mongoose = require('mongoose');

const { urlRegex, ruNameMovie, enNameMovie } = require('../utils/regex/regexPattern');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: (props) => `${props.value} — ссылка на постер фильма не валидна!`,
    },
    required: true,
  },
  trailer: {
    type: String,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: (props) => `${props.value} — ссылка на трейлер фильма не валидна!`,
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: (props) => `${props.value} — ссылка на миниатюрное изображение постера к фильму не валидна!`,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    validate: {
      validator: (v) => ruNameMovie.test(v),
      message: (props) => `${props.value} — название фильма должно быть на русском языке!`,
    },
    required: true,
  },
  nameEN: {
    type: String,
    validate: {
      validator: (v) => enNameMovie.test(v),
      message: (props) => `${props.value} — название фильма должно быть на английском языке!`,
    },
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
