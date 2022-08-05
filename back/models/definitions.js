import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const transformId = () => {
  return (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  };
};

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

export const Definition = mongoose.model('Definition', schema);
