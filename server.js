/* eslint-disable no-console */
const mongoose = require('mongoose');
const app = require('./app');

const { PORT, MONGODB_URI } = require('./utils/configs/envConfig');

mongoose.set('runValidators', true);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
