import mongoose from 'mongoose';
import type { SensorDataDto } from '../interfaces';
import { renameStorageId } from './utils';

const { Schema } = mongoose;

/** Схема данныхс устройств. */
const schema = new Schema<SensorDataDto>(
  {
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
      transform: renameStorageId,
      versionKey: false,
    },
    toObject: {
      transform: renameStorageId,
      versionKey: false,
    },
  }
);

export const SensorData = mongoose.model('SensorData', schema);
