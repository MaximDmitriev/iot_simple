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
  sensorname: {
    type: String,
    required: true,
    unique: true,
  },
  sensorId: {
    type: String,
    required: true,
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
},
{
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
    versionKey: false,
  },
  toObject: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
    versionKey: false,
  },
});

exports.Sensors = mongoose.model('Sensors', schema);
