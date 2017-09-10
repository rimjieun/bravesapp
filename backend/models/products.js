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
    required: true
  },
  productImageUrl: {
    type:String,
    required: true
  },
  vendor: {
    vendorName: {
      type: String,
      required: true
    },
    id: {
    type: mongoose.Schema.Types.ObjectID
    }
    
  },
  quantityOrdered: {
    type: Number,
    default: 0
  }

})

productSchema.methods.display = function () {
  return {
    name: this.name,
    price: `$${this.price}`,
    description: this.description,
    vendor: this.vendor,
    id: this._id
  }
}

module.exports = productSchema;