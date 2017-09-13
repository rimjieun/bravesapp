/**
 * Created by mqallc on 9/10/17.
 */

const express = require("express"), foodRouter = new express.Router();
const Vendor = require("../models/vendor");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//==================================GET Routes==============================================
// User gets restaurant list
foodRouter.get("/foodlist", function(connectionError, req, res){
   if(connectionError){
       res.json({status: 502, message: "connection failed"});
   }
   return Vendor.find({})
       .then(function(restaurants){
            res.status(200).json(restaurants.userView());
       })
       .catch(function (foodError){
        console.log(foodError); //do something
        return res.status(500).json({"message": "Internal error"});
   })

});

// Vendor gets orders for it's location
foodRouter.get("/location/:number", function(connectionError, req, res,){
   if(connectionError){
       res.status(502).json({"message": "connection failed."});
   }
   let locationNumber = req.params.number;
   return Vendor.find({"vendorName":req.body.vendorName})
       .then(function(specificRestaurant) {
           let yourOrderList = [];
           specificRestaurant.orders.locationOrders.forEach(function (item){
               if(item.locationNumber === locationNumber){
                   yourOrderList = item.locationOrders;
               }else {
                   console.log("This order was not found.");
               }

           });
           res.status(200).json(yourOrderList.slice());

       })
       .catch(function (catchLocationError){
        console.log(catchLocationError);
        return res.status(500).json({"message": "Internal error"});
       })


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

    const missingFields = {};

    const topLevelRequiredFields = ['username', 'password', 'first_name', 'last_name', 'role', 'sectionNumber', 'vendorName', 'currentOrder'];

    topLevelRequiredFields.forEach((field) => {
        if (!field in req.body) {
            missingFields[field] = field;
        }
    });
});



module.exports = foodRouter;
