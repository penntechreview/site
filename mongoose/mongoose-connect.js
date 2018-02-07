const mongoose = require('mongoose');
const env = require('dotenv');
env.config();

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to database!');
});

mongoose.connect(process.env.MONGO_URI);

mongoose.Promise = global.Promise;

module.exports = mongoose;