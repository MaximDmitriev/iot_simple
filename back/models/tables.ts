import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
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
    transform: function(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
    versionKey: false,
  },
  toObject: {
    transform: function(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
    versionKey: false,
  },
});

export const Table = mongoose.model('Table', schema);
