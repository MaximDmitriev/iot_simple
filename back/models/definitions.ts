import mongoose from 'mongoose';
import { renameStorageId } from './utils';

const { Schema } = mongoose;

/** Схема описания отчета (список или форма). */
const columnsSchema = new Schema({
  order: {
    type: Number,
    required: true,
  },
  systemname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  width: {
    type: String,
    default: '80px',
  },
  visible: {
    type: Boolean,
    default: true,
  },
  show_in_form: {
    type: Boolean,
    default: true,
  },
  pattern: {
    type: Array,
  },
  position: {
    type: [Number, Number],
    required: true,
  },
  size: {
    type: [Number, Number],
    required: true,
  },
  style: {
    type: String,
    default: 'text',
  },
  required: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  onlyCreated: {
    type: Boolean,
    default: false,
  },
});

const schema = new Schema(
  {
    tablename: {
      type: String,
      unique: true,
      required: true,
    },
    columns: [columnsSchema],
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

export const Definition = mongoose.model('Definition', schema);
