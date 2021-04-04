const mongoose = require('../lib/mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  clusterId: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  production_name: {
    type: String,
  },
  data: [dataSchema],
});

exports.Sensors = mongoose.model('Sensors', schema);
