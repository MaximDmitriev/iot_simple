import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
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
});

export const User = mongoose.model('User', schema);
