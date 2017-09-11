const express = require("express"),
      morgan = require("morgan"),
      bodyParser = require("body-parser"),
      path = require("path");


const app = express(),
      port = process.env.PORT || 3000;

app.use(morgan("dev"));

require("./vendors/routes/routes")(app, path);

app.listen(port, () => {
    console.log("App's starting at port ", port);
});

