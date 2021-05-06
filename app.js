/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const { DB_CONN = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
