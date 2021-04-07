const mongoose = require('../lib/mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  devicename: {
    type: String,
    required: true,
    unique: true,
  },
  deviceId: {
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
  board: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  content: {
    type: Array,
  },
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

exports.Devices = mongoose.model('Devices', schema);
