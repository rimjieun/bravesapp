// Import libraries and frameworks 
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Set mongoose promises to global promises (mongoose promises are deprecated)
mongoose.Promise = global.Promise;

// Enable env variables
require('dotenv').config();

// Initialize server
const app = express();

// Logging
app.use(morgan('combined'));

const Vendor = require('./backend/models/vendor');
const User = require('./backend/models/user');
const mock = require('./backend/models/vendor_mock');
const food_router = require('./backend/routes/food_routes');

app.use("/food", food_router);




const dbConnection = (dbUrl=process.env.DB_URL) => {
  return mongoose.connect(dbUrl, {useMongoClient: true})
    .then( () => {
      console.log('Mongoose connection to bravesDb active.');
      
       
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

const closeServer = () => {
  
  return mongoose.disconnect()
    .then( () => { 
      console.log('mongoose disconnecting');
      return new Promise( (resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if (err) {
            reject(err);
            return;
          } 
          resolve();
        });
      }); 
    });
  };


if (require.main === module ) {
  runServer()
  .then( () => {
    dbConnection();

  })
.catch( (err) => console.log(err));
}

