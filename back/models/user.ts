import mongoose from 'mongoose';
import type { UserDto } from '../interfaces';
import { renameStorageId } from './utils';

const { Schema } = mongoose;

// @TODO добавить ролевую модель + id
/** Схема пользовалелей. */
const schema = new Schema<UserDto>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
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

export const User = mongoose.model('User', schema);
