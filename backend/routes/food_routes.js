/**
 * Created by mqallc on 9/10/17.
 */

const express = require("express"),
  foodRouter = new express.Router();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
  
const User = require('./../models/user');
const Vendor = require("../models/vendor");

//==================================GET Routes==============================================
// User gets restaurant list
foodRouter.get("/foodlist", function (connectionError, req, res, next) {
  if (connectionError) {
    res.json({
      status: 502,
      message: "connection failed"
    });
  }
  return Vendor.find({})
        .then(function (restaurants) {
          res.status(200).json(restaurants.userView());
        })
        .catch(function (foodError) {
          console.log(foodError); //do something
          return res.status(500).json({
            "message": "Internal error"
          });
        });

});

// Vendor gets orders for it's location
foodRouter.get("/location/:number", function (connectionError, req, res, next ) {
  if (connectionError) {
    res.status(502).json({
      "message": "connection failed."
    });
  }
  let locationNumber = req.params.number;
  return Vendor.find({
    "vendorName": req.body.vendorName
  })
        .then(function (specificRestaurant) {
          let yourOrderList = [];
          specificRestaurant.locations.forEach(function (location) {
            if (location.locationNumber === locationNumber) {
              yourOrderList = location.locationOrders.slice();
            } else {
              console.log("This order was not found.");
            }

          });
          res.status(200).json(yourOrderList);

        })
        .catch(function (catchLocationError) {
          console.log(catchLocationError);
          return res.status(500).json({
            "message": "Internal error"
          });
        });


});

//==================================POST Routes=============================================


// User POSTS Order
foodRouter.post('/user/order', function (connectionError, req, res, next) {
  if (connectionError) {
    return res.status(502).json({
      "message": "connection failed."
    });
  } 

    // Verify that the user has provided the necessary information

  const missingFields = [];

  const topLevelRequiredFields = ['username', 'password', 'firstName', 'lastName', 'role', 'sectionNumber', 'currentOrder'];

  const secondLevelRequiredFields = ['vendorName', 'order'];

  topLevelRequiredFields.forEach( (field) => {
    if (! (field in req.body)) {
      missingFields.push(field);
    }
  });

  secondLevelRequiredFields.forEach( (field) => {
    if (! (field in req.body.currentOrder)) {
      missingFields.push(field);
    }
  });
    
  if (missingFields.length === 0) {
    return res.status(400).json({missingFields: missingFields});
  }

  let _user;
  return User  
    .find({username: req.body.username, firstName:req.body.firstName, lastName: req.body.lastName})
    .then( (user) => {
        // assign the user the right location using the internal method:
        user.locationFinder();
        _user = user;
        
    })
    .catch( (err) => {
        console.log('Internal server error: User not found', err);
        return res.status(500).json({error: 'Internal server Error: User not found'});
    })



});

module.exports = foodRouter;