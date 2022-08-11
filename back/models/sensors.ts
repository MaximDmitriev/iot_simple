import mongoose from 'mongoose';
import type { DeviceDto } from '../interfaces';
import { renameStorageId } from './utils';

const { Schema } = mongoose;

/** Схема устройств/датчиков. */
const schema = new Schema<DeviceDto>(
  {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    clusterId: {
      type: Number,
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
      transform: renameStorageId,
      versionKey: false,
    },
    toObject: {
      transform: renameStorageId,
      versionKey: false,
    },
  }
);

export const Sensors = mongoose.model('Sensors', schema);
export const Relays = mongoose.model('Relays', schema);
