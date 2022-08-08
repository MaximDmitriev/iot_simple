import mongoose from 'mongoose';
import { renameStorageId } from './utils';

const { Schema } = mongoose;

/** Схема одноплатника. */
const schema = new Schema(
  {
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
      transform: renameStorageId,
      versionKey: false,
    },
    toObject: {
      transform: renameStorageId,
      versionKey: false,
    },
  }
);

export const Boards = mongoose.model('Boards', schema);
