/* eslint-disable no-console */
const mongoose = require('mongoose');
const app = require('./app');

const { PORT, DB_CONN } = require('./utils/configs/envConfig');

mongoose.set('runValidators', true);

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
