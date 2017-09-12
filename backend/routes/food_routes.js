/**
 * Created by mqallc on 9/10/17.
 */

const express = require("express"),
  foodRouter = new express.Router();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
  
const User = require('./../models/user');
const Vendor = require("../models/vendor");
const bodyParser = require('body-parser');
foodRouter.use(bodyParser.urlencoded({extended: true}));
foodRouter.use(bodyParser.json());

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

// TODO do authentication for vendor

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

// foodRouter.post('/wolf', (req, res) => {
//     console.log(req.body);
//     User.create(req.body)
//         .then ( (wolf) => {
//             console.log(wolf);
//             return res.status(200).json(wolf);
//         })
//         .catch( err => {
//             console.log(err);
//             return res.status(400).json(err);
        
//         });
// });

// foodRouter.get('/wolfie', (req, res) => {
//     User.find()
//     .then ( (user) => {
//         console.log(user);
//         user[0].locationFinder();
//         console.log(user[0]);
        

//     })
//     .catch(err => console.log(err));
// });

// foodRouter.put('/get', (req, res) => {
//     console.log('this route is working too!');

//     return User.findByIdAndUpdate({"_id":"59b779a9734d1d53ff3a743a"})
//     .then( (user) => {
//         console.log('this is then');
//         console.log(user, 'THIS IS THE USER!!');

//         user.role = "vendor";
//         delete user.password;
//         console.log('changed user', user);
//         return user.save()
//         .then ((_user) => {
//             console.log(_user, '_user');
//             return res.status(200).json(user);
//         })
//         .catch( (err) => {
//             console.log(err, 'error inside the save!');
//         });

//     })
//     .catch( (err) => {
//         console.log(err, 'error');
//         return res.status(400).json({error:"error"});
//     })

// });

// foodRouter.post('/test', (req, res) => {
//     console.log('This route is working');
//     console.log(req.body, 'req.body');
//     return User.create(req.body)
//         .then( (user) => {
//             console.log('users', user);
//             return res.status(200).send('a ok');
//         })
//         .catch( (err) => {
//             console.log('error', err);
//             return res.status(400).json({message: 'error'});
//         });


// });


// User POSTS Order
foodRouter.post('/user/order', function (connectionError, req, res, next) {
  if (connectionError) {
    return res.status(502).json({
      "message": "connection failed."
    });
  } 

  req.user.username;
  req.user.password;
  req.user.role;

    // TODO verify req authentication for user req.user....
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
        var locationNumber = user.currentOrder.locationNumber;
        _user = user;
        return Vendor.find()
    })
    .catch( (err) => {
        console.log('Internal server error: User not found', err);
        return res.status(500).json({error: 'Internal server Error: User not found'});
    });



});

module.exports = foodRouter;