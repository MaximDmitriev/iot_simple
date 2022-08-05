import mongoose from 'mongoose';

const { Schema } = mongoose;

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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Definition',
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;

        return ret;
      },
      versionKey: false,
    },
    toObject: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;

        return ret;
      },
      versionKey: false,
    },
  }
);

export const Table = mongoose.model('Table', schema);
