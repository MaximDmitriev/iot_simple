import mongoose from 'mongoose';
import type { BoardDto } from '../interfaces';
import { renameStorageId } from './utils';

const { Schema } = mongoose;

/** Схема одноплатника. */
const schema = new Schema<BoardDto>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    id: {
      type: Number,
      required: true,
    },
    clusterId: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
    },
    boardName: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    components: {
      type: [Number],
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
