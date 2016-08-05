// import dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var requestHTTP = require('request'); // HTTP client

// for parsing application/json
app.use(bodyParser.json());

// your SmartCar API endpoint '/getVehicleInfo', name it whatever you want for the spec and provide documentation

