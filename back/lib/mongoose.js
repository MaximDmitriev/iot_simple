const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.get('mongoose:uri'),
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'esp_training' });

module.exports = mongoose;
