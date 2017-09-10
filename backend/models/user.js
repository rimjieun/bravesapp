const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const productSchema = require('./products');

const userValidation = [/^\w{4,}$/, 'Username must contain only alphanumberic characters'];
const roleValidation = [/(?=^vendor$)|(?=^customer$)/, 'Role must be a teacher or a student'];

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    match: userValidation,
    trim: true
  },
  password: {
    type: String,
    minlength: 8,
    trim: true
  },
  first_name: {
    type: String,
    minlength: 2,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    minlength: 2,
    required: true,
    trim: true
  },
  role: {
    type: String,
    match: roleValidation


  },
  // for the user, their sectionnumber on their ticket
  // for the vendor, their location number
  sectionNumber: {
    type: Number
  },
  vendorName: {

  },
  currentOrder: {
    order: {
      type: [productSchema]
    },
    orderNumber: {
      type: String
    },
    orderTaken: {
      type: Date,
      default: Date()
    },
    completed: {
      type: Boolean,
      default: false
    },
    comments: {
      type: String
    },
    locationNumber: {
      type:Number
    }
  },


});

userSchema.pre('save', function(next) {

  if (this.role === 'vendor' && !this.password) {
    return next(new Error('The password is required when the role is vendor'));
  }
});



//
// userSchema.methods.locationFinder = function () {
//   switch(this.sectionNumber && this.vendorName == '1871 Grille') {
//     case: 337-343
//       this.order.locationNumber = 343
//
// }

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


User.locationFinder();

var locationNumber = User.currentOrder.locationNumber;