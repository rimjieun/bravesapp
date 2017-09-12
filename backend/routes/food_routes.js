/**
 * Created by mqallc on 9/10/17.
 */

const express = require("express"), foodRouter = new express.Router();
const Vendor = require("../models/vendor");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// User gets restaurant list
foodRouter.get("/foodlist", function(req, res, connectionError){
   // if(connectionError){
   //     res.json({status: 502, message: "connection failed"});
   // }
   return Vendor.find({})
       .then(function(restaurants){
            console.log('GET request success');
            res.status(200).json(restaurants);
       })
       .catch(function (foodError){
        console.log(foodError); //do something
        return res.status(500).json({"message": "Internal error"});
   })

});

// Vendor gets orders for it's location
foodRouter.get("/location/:number", function(req, res, connectionError){
   if(connectionError){
       res.status(502).json({"message": "connection failed."});
   }
   let locationNumber = req.param.number;
   return Vendor.find({})
       .then(function(specificRestaurant) {
           let yourOrderList = [];
           specificRestaurant.locationOrders.forEach(function (item){
               if(item.locationNumber === locationNumber)
                   array.push(item);

           });
           res.status(200).json(yourOrderList.slice());

       })
       .catch(function (catchLocationError){
        console.log(catchLocationError);
        return res.status(500).json({"message": "Internal error"});
       })


});

module.exports = foodRouter;





//JIEUN TESTING VENDOR MOCK DATA**********************************************************
//*******************************************************************************************
const vendors = require('../models/vendor_mock.js');

foodRouter.get("/vendors", function(req, res){
   res.status(200).json(vendors);
});
//*******************************************************************************************
//*******************************************************************************************