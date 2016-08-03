// import dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var requestHTTP = require('request'); // HTTP client

// for parsing application/json
app.use(bodyParser.json());

// your SmartCar API endpoint '/getVehicleInfo', name it whatever you want for the spec and provide documentation
app.post('/getVehicleInfo', function(req, res) {
  // setup POST request for GM API
  var options = {
    url: 'gmapi.azurewebsites.net/getVehicleInfoService',
    json: true
    body: {
      id: req.body.id,
      responseType: "JSON"
    }
  };

  // execute POST request to GM API
  requestHTTP.post(options, function(error, response, body) {
    var vehicleData,
        result = {
          status: 200,
          data: {}
        };
    
    if (response.statusCode == 200 || response.statusCode == 201) {
      vehicleData = body.data;
      
      // format data however you'd like, this is just a simple sample
      for (var feature in vehicleData) {
        console.log('Feature:', feature, ", Value:", vehicleData[feature]['value']); // in case you want to read the data
        result['data'][feature] = vehicleData[feature]['value']; // store data in new structure
      }
    } else {
      result.status = 500; // or whichever error code you think is relevant  
    }
  });
  
  // return new JSON object to client
  res.json(result);
});
