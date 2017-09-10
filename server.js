// Import libraries and frameworks 
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Enable env variables
require('dotenv').config();

// Initialize server
const app = express();

// Logging
app.use(morgan('combined'));

let server;
// console.log('PROCESS',process.env)
const runServer = (port=process.env.PORT) => {
  return new Promise( (resolve, reject) => {
    
    resolve(server = app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
  }) )
  
  })
  // .then(() => {console.log('this happened')})
  // .catch((err) => { console.log('this had an error')})

}

if (require.main === module ) {
  runServer()
  .then( () => {
  console.log(process.env.something)

  })
.catch( (err) => console.log(err));
}

