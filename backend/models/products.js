const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    match: [/^\d+\.\d{2}$/, 'The price must be a number ending with two decimal places.'],
    required: true
  },
  description: {
    type: String,
    default: 'Please provide a description'
  },
  productImageUrl: {
    type:String,
    default: 'Please provide an image'
  },
  vendor: {
    vendorName: {
      type: String,
      required: true
    },
    id: {
      type: mongoose.Schema.Types.ObjectId
    }
    
  },
  quantityOrdered: {
    type: Number,
    default: 0
  }

});

productSchema.methods.display = function () {
  return {
    name: this.name,
    price: `$${this.price}`,
    description: this.description,
    vendor: this.vendor,
    id: this._id
  };
};

module.exports = productSchema;