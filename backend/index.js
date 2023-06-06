const express = require("express");
const compression = require('compression')
const bodyParser = require("body-parser");
const cors = require("cors");
const asyncify = require('express-asyncify');
require('dotenv').config();

const app = asyncify(express());
app.use(compression())
app.use(express.json({ limit: '50mb' }));

var corsOptions = {
  origin: "http://localhost:3000" //Notre front end
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the ArtMatch Backend application." });
});

require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});