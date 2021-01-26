const mongoose = require('../lib/mongoose');

const Schema = mongoose.Schema;

const transformId = () => {
  return (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
}

const columnsSchema = new Schema({
  order: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  displayname: {
    type: String
  },
  width: {
    type: String,
    default: '80px'
  },
  visible: {
    type: Boolean,
    default: true
  }
});

const schema = new Schema(
  {
    tablename: {
      type: String,
      unique: true,
      required: true
    },
    columns: [columnsSchema]
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
    }
  });

exports.Deifnition = mongoose.model('Definition', schema);