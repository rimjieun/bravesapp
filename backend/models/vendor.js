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
  },
  comments: {
    type: String
  },
  orderNumber: {
    type: String
  },
  orderTaken: {
    type: Date,
    default: Date()
  },
  total: {
    type: Number,
    match:  match: [/^\d+\.\d{2}$/, 'The price must be a number ending with two decimal places.'];
  }

})

const vendorSchema = new mongoose.Schema ({ 

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


vendorSchema.methods.calculateTotal = function () {
  
  this.orders.forEach( (order) => {
    let orderTotal=0.00;
    order.map( (product) {
      orderTotal += product.price
    })
    order.total = orderTotal;
  })
}


const Vendor = mongoose.model('vendor', vendorSchema);

module.exports = Vendor;