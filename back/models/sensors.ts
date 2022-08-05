import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema(
  {
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
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;

        return ret;
      },
      versionKey: false,
    },
    toObject: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;

        return ret;
      },
      versionKey: false,
    },
  }
);

export const Sensors = mongoose.model('Sensors', schema);
export const Relays = mongoose.model('Relays', schema);
