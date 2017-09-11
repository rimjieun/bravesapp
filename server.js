// Import libraries and frameworks 
const express = require('express'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      path = require("path");

// Set mongoose promises to global promises (mongoose promises are deprecated)
mongoose.Promise = global.Promise;

// Enable env variables
require('dotenv').config();

// Initialize server
const app = express();

// Logging
app.use(morgan('combined'));

const Vendor = require('./backend/models/vendor');
const mock = require('./backend/models/vendor_mock');
const foodRouter = require('./backend/routes/food_routes');

app.use('/food', foodRouter);

const dbConnection = (dbUrl=process.env.DB_URL) => {
  return mongoose.connect(dbUrl)
    .then( () => {
      console.log('Mongoose connection to bravesDb active.');
      return Vendor.find()
       .then( (result) => console.log('now in the db:', result));
    })
    .catch(err => console.log(err));
};


let server;
// console.log('PROCESS',process.env)
const runServer = (port=process.env.PORT) => {
  return new Promise( (resolve, reject) => {
    
    resolve(server = app.listen(port, () => {
      console.log(`The server is running on port ${port}`)
      ;
      // console.log(mock);
      
    }));
  
  });
  // .then(() => {console.log('this happened')})
  // .catch((err) => { console.log('this had an error')})

};

if (require.main === module ) {
  runServer()
  .then( () => {
    dbConnection();

  })
.catch( (err) => console.log(err));
}

