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

// foodRouter.get("/foodlist", function (connectionError, req, res, next) {
//   if (connectionError) {
//     res.json({
//       status: 502,
//       message: "connection failed"
//     });
//   }
//   return Vendor.find({})
//         .then(function (restaurants) {
//           res.status(200).json({restaurants: restaurants.map((restaurant) => {
//               return restaurant.userView()
//           }));
//         })
//         .catch(function (foodError) {
//           console.log(foodError); //do something
//           return res.status(500).json({
//             "message": "Internal error"
//           });
//         });
// });



// Gets full information for the vendor

foodRouter.get("/vendor/:vendorname", (connectionError, req, res, next) => {
    
    // Authenticate user - uncomment when passport implemented
    // if (!(req.user.username) && !(req.user.password) && req.user.role === "vendor") {
    //     return res.status(403).json({error: "Unauthorized"});
    // }

    if (connectionError) {
        return res.status(500).json({error: "Internal server error: connection error"})
    }

    return Vendor.findOne({vendorName: req.params.vendorName})
        .then ((vendor) => {
            return res.status(200).json(vendor);

        })
        .catch( (error) => {
            console.log('Internal Server error: Vendor not found', error);
            return res.status(404).json({error: "Internal server error: vendor not found."});
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

foodRouter.post('/wolf', (req, res) => {
    console.log(req.body);
    User.create(req.body)
        .then ( (wolf) => {
            console.log(wolf);
            return res.status(200).json(wolf);
        })
        .catch( err => {
            console.log(err);
            return res.status(400).json(err);
        
        });
});

foodRouter.get('/wolfie', (req, res) => {
    User.find()
    .then ( (users) => {
        console.log(users);
        users[0].locationFinder();
        console.log(users[0]);
        return res.status(200).json({users});
        

    })
    .catch(err => console.log(err));
});

foodRouter.put('/get', (req, res) => {
    console.log('this route is working too!');

    return User.findByIdAndUpdate({"_id":"59b796b71f7309d084bb512a"})
    .then( (user) => {
        console.log('this is then');
        console.log(user, 'THIS IS THE USER!!');

        user.role = "vendor";
        user.firstName = "Esterling";
        user.lastName = "Accime";
        console.log('changed user', user);
        return user.save()
        .then ((_user) => {
            console.log(_user, '_user');
            return res.status(200).json(user);
        })
        .catch( (err) => {
            console.log(err, 'error inside the save!');
        });

    })
    .catch( (err) => {
        console.log(err, 'error');
        return res.status(400).json({error:"error"});
    })

});

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
// Endpoint expects:

    /* 
    req.body
    {
        username, password, firstName, lastName, role, section number, currentOrder.vendorName, currentOrder.order array of products
    }

    req.user
    {
        username, password
    }

    //Strategy
    
    1. Validate that user has access to this endpoint
    2. Check req.body for missing fields and return an array of missing fields if they exist.
    3. Find the matching user object, and update it for the User Schema
    4. Find the matching vendor based on the information in the user object, and update that too.

    */
        
    



foodRouter.post('/user/order', function (connectionError, req, res, next) {
  if (connectionError) {
    return res.status(502).json({
      "message": "connection failed."
    });
  } 

    // Authenticate user - uncomment when passport implemented
    // if (!(req.user.username) && !(req.user.password) && req.user.role === "customer") {
    //     return res.status(403).json({error: "Unauthorized"});
    // }


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
    .findOneAndUpdate({username: req.body.username, firstName:req.body.firstName, lastName: req.body.lastName})
    .then( (user) => {
        // assign the user the right location and generates an order number using the internal methods:
        user.locationFinder();
        user.orderNumberGenerator();
        var locationNumber = user.currentOrder.locationNumber;
        

        
        // 1. If the passwords match, create the updated user object to be saved to the user DB and returned to the user (updating the order info on the front end), including the updated location value
        // 2. Grab the current order and push it to the end of the array the the specific location
        if (user.password === req.body.password) {
            let currentOrder = Object.assign( {}, user.currentOrder);
            
            // grab the vendor name and location number to find the data in the vendor object
            const {vendorName, locationNumber} = currentOrder;

            //merge the user object and overwrite the req.body of the current order
            _user = Object.assign( {}, user, req.body);
            
            // save the user to the DB, then find the same order with the vendor, and save it there too
            return _user.save()
                .then( (savedUser) => {
                    console.log('The user has been saved!', savedUser);

                    return Vendor.findOneAndUpdate({vendorName})
                        .then( (vendor) => {
                            vendor.locations.forEach( (location) => {
                                // if the location numbers match, push the order to the end of the locationorders array
                                if (location.locationNumber === locationNumber) {
                                    location.locationOrders.push(currentOrder);
                                }
                            });

                            return vendor.save()
                                .then( (saved_vendor) => {
                                    console.log('The vendor saved successfully!', saved_vendor);
                                    //Finally returning the updated user object to the user
                                    return res.status(200).json(_user);

                                })
                                .catch( (error) => {
                                    console.log('There was an internal server error saving the vendor');
                                    return res.status(500).json({error: 'Internal server error saving the vendor'});
                                })

                        })
                        .catch( error => {
                            console.log('There was an error finding the vendor', error);
                            return res.status(500).json({error: "Internal server error finding the vendor"});
                        });

                })
                .catch( (err) => {
                    console.log('There was an error saving', err);
                    return res.status(500).json({error: "Internal server error saving the user"});
                });

            }

        console.log(_user);

    })
    .catch( (err) => {
        console.log('Internal server error: User not found', err);
        return res.status(500).json({error: 'Internal server Error: User not found'});
    });



});

module.exports = foodRouter;