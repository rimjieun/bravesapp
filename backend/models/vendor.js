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
  // put quantity ordered here!
  locationOrders: {
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
    type:[locationSchema] // 7 indexes top layer (each location)
  },
  completedOrders: {
    type:[orderSchema]
  } 

});


vendorSchema.methods.calculateTotal = function (locationNumber) {
  
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


/* 
1.  User GET
  - User gets a list of restaurants (with the appropriate show method, do not use the method that shows the orders for that restaurant (private to vendor))
  vendor info is hardcoded into db
  Vendor.someshowmethod this method makes data private
  Return Vendor.Find(...) // async - returns a promise (mongoose.Promise = global.Promise)

  .then( 
    return res.status(200).json(restaurantdata)
    handle front end with displaying the restaurants)

  2. User POST
    -User posts their data
    -Order is written to the user object under currentOrder
    User.find(pull up the user data)
    .then
    (
      -run the switch statement function to determine location, save to a variable above this scope, and then use that variable inside of the vendor write
      write the data (order), ending with a .save)

    ALSO
    Vendor.Find(match the vendorname)
    .then (
                        object containing the right orders array and a key with the locationnumber
      vendor.orders.locationorder.locationnumber // push to the right location number
    )
    .then ( document.save()
  )


  3. Vendor Get
    - Vendor gets their full document based on their login credentials
    -authenticate vendor, get document containing their orders and find the matching array that matches that vendor number (which you collect when the vendor registers)
    - on the front end, find the right location number matching the object, and render that specific array

    1 restaurant, 7 locations, each location has a separate login
    each login accesses the ENTIRE object, and processes according their location number (on the front end store their location number to help with processing)

    render data on frontend


    4. Vendor POST
      -vendor will find the matching user (which is nested in the order object using User.find()...)
      -vendor will change completed to TRUE


    5. User GET update on their order
      -separate endpoint to poll to see if the order has been completed. if it has, update interface on front end appropriately



*/