const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const productSchema = require('./products');

const userValidation = [/^\w{4,}$/, 'Username must contain only alphanumberic characters'];

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: maxlength,
    match: userValidation,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true
  },
  first_name: {
    type: String,
    minlength: 2,
    maxlength: maxlength,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    minlength: 2,
    maxlength: maxlength,
    required: true,
    trim: true
  },
  role: {
    type: String,


  },
  currentOrder: {
    order: {
     type: [productSchema]
    },
    orderNumber: {
      type: string
    },
    orderTaken: {
      type: Date,
      default: Date()
    },
    completed: {
      type: Boolean
    }
  },


});

userSchema.methods.showUser = function () {
  return {
    username: this.username,
    first_name: this.first_name,
    last_name: this.last_name,
    id: this._id
  };  
};

userSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
