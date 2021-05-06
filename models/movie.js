const mongoose = require('mongoose');

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
      validator: (v) => /(https?:\/\/(([\w-]+\.)+)+([\w])+((\/[a-z_0-9\-:~\\.%\\/?#[\]@!$&'\\(\\)*+,;=]+)+)?)/gi.test(v),
      message: (props) => `${props.value} — ссылка на постер фильма не валидна!`,
    },
    required: true,
  },
  trailer: {
    type: String,
    validate: {
      validator: (v) => /(https?:\/\/(([\w-]+\.)+)+([\w])+((\/[a-z_0-9\-:~\\.%\\/?#[\]@!$&'\\(\\)*+,;=]+)+)?)/gi.test(v),
      message: (props) => `${props.value} — ссылка на трейлер фильма не валидна!`,
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (v) => /(https?:\/\/(([\w-]+\.)+)+([\w])+((\/[a-z_0-9\-:~\\.%\\/?#[\]@!$&'\\(\\)*+,;=]+)+)?)/gi.test(v),
      message: (props) => `${props.value} — ссылка на миниатюрное изображение постера к фильму не валидна!`,
    },
    required: true,
  },
  owner: {
    required: true,
  },
  movieId: {
    required: true,
  },
  nameRU: {
    type: String,
    validate: {
      validator: (v) => /((?<digits>\d+)|(?<punctuation>\p{P}+)|(?<roman>\bM{0,4}(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})\b)|(?<literal>[\W]+))/gi.test(v),
      message: (props) => `${props.value} — название фильма должно быть на русском языке!`,
    },
    required: true,
  },
  nameEN: {
    type: String,
    validate: {
      validator: (v) => /((?<digits>\d+)|(?<punctuation>\p{P}+)|(?<roman>\bM{0,4}(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})\b)|(?<literal>[\w]+))/gi.test(v),
      message: (props) => `${props.value} — название фильма должно быть на английском языке!`,
    },
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
