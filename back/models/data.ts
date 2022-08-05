import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  sensorId: {
    type: String,
    required: true,
  },
  clusterId: {
    type: String,
    required: true,
  },
  datetime: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
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

export const Data = mongoose.model('Data', schema);
