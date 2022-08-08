import mongoose from 'mongoose';
import { renameStorageId } from './utils';

const { Schema } = mongoose;

/** Схема таблиц. */
const schema = new Schema(
  {
    tablename: {
      type: String,
      unique: true,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    definition: {
      type: Schema.Types.ObjectId,
      ref: 'Definition',
      required: true,
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

export const Table = mongoose.model('Table', schema);
