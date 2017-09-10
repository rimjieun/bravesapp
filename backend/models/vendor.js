const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const productSchema = require('./products');

const orderSchema = new mongoose.Schema({

  order: {
    type: [productSchema]
  }, 
  completed: {
    type: Boolean,
    default: false
  }
})

const vendorSchema = new mongoose.Schema({ 

  vendorName: {
    type: String,
    required: true
  },
  foodCategory: {
    type: String,
    required: true
  },
  menu: {
    type: [productSchema],
    required: true
  },
  orders: {
    type:[orderSchema]
  }

})