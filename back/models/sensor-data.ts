import mongoose from 'mongoose';
import type { SensorDataDto } from '../interfaces';
import { renameStorageId } from './utils';

const { Schema } = mongoose;

/** Схема данных с устройств. */
const schema = new Schema<SensorDataDto>(
  {
    sensorId: {
      type: Number,
      required: true,
    },
    clusterId: {
      type: Number,
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
