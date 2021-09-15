const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_WORK_FACTOR } = require('../config');

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  bio: String,
  website: String,
  location: String,
});

userSchema.statics.isEmailTaken = async function (email, excludeId) {
  const user = await this.findOne({ email, _id: { $ne: excludeId } });
  return Boolean(user);
};

userSchema.statics.isUsernameTaken = async function (username, excludeId) {
  const user = await this.findOne({ username, _id: { $ne: excludeId } });
  return Boolean(user);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(Number(SALT_WORK_FACTOR));
    user.password = await bcrypt.hash(user.password, salt);
  }
  return next();
});

/**
 * DO NOT MOVE
 * .model() must be called after adding everything to schema, including hooks
 */
const User = mongoose.model('User', userSchema);

module.exports = { User, userSchema };
