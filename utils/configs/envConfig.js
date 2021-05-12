const dotenv = require('dotenv');

dotenv.config();

const {
  PORT = 3000,
  DB_CONN = 'mongodb://localhost:27017/moviesdb',
  SECRET_KEY = 'super-strong-secret',
} = process.env;

module.exports = {
  PORT,
  DB_CONN,
  SECRET_KEY,
};
