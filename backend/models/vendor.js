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
  customer: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String
    }
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
    match: [/^\d+\.\d{2}$/, 'The price must be a number ending with two decimal places.']
  }

});

const locationSchema = new mongoose.Schema({
  orders: {
    type:[orderSchema]
  },
  locationNumber: {
    type: Number
  }
});

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
    type:[locationSchema]
  },
  completedOrders: {
    type:[orderSchema]
  } 

});


vendorSchema.methods.calculateTotal = function () {
  
  this.orders.forEach( (order) => {
    let orderTotal=0.00;
    order.map( (product) => {
      orderTotal += product.price * product.quantityOrdered;
    });
    order.total = orderTotal;
  });
};


const Vendor = mongoose.model('vendor', vendorSchema);

module.exports = Vendor;