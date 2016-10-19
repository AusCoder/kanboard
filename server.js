// =======================
// Import Libraries
// =======================
var express = require("express");
var compress = require("compression");
var bodyParser = require("body-parser");
var helmet = require('helmet');

var app = express();

global.__root = __dirname + "/"; // eslint-disable-line

process.on("uncaughtException", function (err) {
	console.log("Caught exception: " + err); // eslint-disable-line
});

// =======================
// Expressjs Configuration
// =======================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compress());
app.use("/assets", express.static(__dirname + "/assets")); // eslint-disable-line
app.use("/public", express.static(__dirname + "/public")); // eslint-disable-line

app.disable("x-powered-by");

// =======================
// Routes
// =======================
require(__root + "express_config/routes/routes").routes(app); // eslint-disable-line

// =======================
// Launch Application
// =======================
var PORT = 11011;
app.listen(PORT);
