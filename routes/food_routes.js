/**
 * Created by mqallc on 9/10/17.
 */

const express = require("express"), foodRouter = new express.Router();
const Vendor = require("../backend/models/vendor");

mongoose.Promise = global.Promise;

foodRouter.get("/foodlist", function(req, res, listError){
   if(listError){
       res.json({status: 404, message: "Bad request"});
   }
   return Vendor.find({})
       .then(function(restaurants){
            res.status(200).json(restaurants.userView());
       })
       .catch(error){
        console.log(error); //do something
        return res.status(500).json({"message": "Internal error"});
   }

});

foodRouter.get("/location/:number", function(req, res, locationError){
   if(locationError){
       res.status(502).json({"message": "Invalid location."});
   }
   let locationNumber = req.param.number;
   return Vendor.find({"id": locationNumber})
       .then(function(specificRestaurant) {
           res.status(200).json(specificRestaurant.userView());
       })
       .catch(locationError){
        console.log(locationError);
        return res.status(500).json({"message": "Internal error"});}


});
