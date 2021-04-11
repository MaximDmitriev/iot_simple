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
  },
  sensorId: {
    type: String,
    required: true,
    unique: true,
  },
  clusterId: {
    type: String,
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
  prodNumber: {
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
exports.Relays = mongoose.model('Relays', schema);
