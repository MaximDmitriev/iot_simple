const crypto = require('crypto');
const mongoose = require('../lib/mongoose');

const Schema = mongoose.Schema;



const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  login: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Number,
    default: new Date().getTime()
  },
},
  {
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
      versionKey: false,
    },
    toObject: {
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
      versionKey: false,
    }
  }
  );

schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {return this._plainPassword});

schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

exports.User = mongoose.model('User', schema);
