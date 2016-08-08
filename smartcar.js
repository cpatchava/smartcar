// import dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var requestHTTP = require('request'); // HTTP client

var validIds = [1234, 1235];// you said that the GM api is sketch, so Id suggest checking to see
//if the IDS even fall within the scope before launching a query 

// for parsing application/json
app.use(bodyParser.json());
function checkVldIds(id){
	var vld = 0;
	for(var i = 0; i <2 ; i++)
		if(validIds[i] == id)
			vld = 1;
		return vld;
}

app.post('/vehicles/:id', function(req, res) {
  // setup POST request for GM API VEHICLE INFO
	var stat_val = 200;
	if(checkVldIds(re.params.id) == 0)
		stat_val == 400;
		
  var options = {
    url: 'gmapi.azurewebsites.net/getVehicleInfoService',
    json: true,
    body: {
      id: req.params.id,
      responseType: "JSON"
    }
  };

  // execute POST request to GM API
  requestHTTP.post(options, function(error, response, body) {
    var vehicleData,
        result = {
          status: stat_val,
					responseType : "JSON",
          "data":[{"vin":"NULL", "color" : "NULL", "doorCount" : "NULL", "driveTrain" : "NULL"}]
        };
    
    if (response.statusCode == 200 || response.statusCode == 201) {
      vehicleData = body.data;
      var obj = JSON.parse(body);
			var numDoors = 2; //initialize it to 2
			if(obj.data.fourDoorSedan.value) //if its 4 change it
				numDoors = 4;
			/*I went with init the doors to 2, in the case that both return false then you have some 
			door number better than init to a value of 0.*/
			result.data.vin = obj.data.vin.value;  
			result.data.color = obj.data.color.value;  
			result.data.doorCount = obj.data.doorCount.value;  
			result.data.driveTrain = obj.data.driveTrain.value;  
		} else {
			if(stat_val == 400)
      	result.status = 400; // or whichever error code you think is relevant  
			else
      	result.status = 500; // or whichever error code you think is relevant  
    }
  });
  
  // return new JSON object to client
  res.json(result);
});

//DOOR STATUS
app.post('/vehicles/:id/doors', function(req, res) {
  // setup POST request for GM API FUEL/BATTERY LEVEL
 	var stat_val = 200;
	if(checkVldIds(re.params.id) == 0)
		stat_val == 400;

 var options = {
    url: 'gmapi.azurewebsites.net/getSecurityStatusService',
    json: true,
    body: {
      id: req.params.id,
      responseType: "JSON"
    }
  };

  // execute POST request to GM API
  requestHTTP.post(options, function(error, response, body) {
    var doorData,
        result = {
          status: stat_val,
					responseType : "JSON",
          "data":[{"location":"frontLeft","locked":"false"},
					{"location":"frontRight","locked":"false" }]
        };

    if (response.statusCode == 200 || response.statusCode == 201) {
      doorData = JSON.parse(body.data);
			result.data[0].locked = doorData.data.doors.values[0].locked;
			result.data[1].locked = doorData.data.doors.values[1].locked;

    } else {
 			if(stat_val == 400)
      	result.status = 400; // or whichever error code you think is relevant  
			else
 			result.status = 500; // or whichever error code you think is relevant  
    }
  });
  
  // return new JSON object to client
  res.json(result);
});


//FUEL LEVEL
app.post('/vehicles/:id/fuel', function(req, res) {
  // setup POST request for GM API
	var stat_val = 200;
	if(checkVldIds(re.params.id) == 0)
		stat_val == 400;
	
	var options = {
    url: 'gmapi.azurewebsites.net/getEnergyService',
    json: true,
    body: {
      id: req.params.id,
      responseType: "JSON"
    }
  };

  // execute POST request to GM API
  requestHTTP.post(options, function(error, response, body) {
    var fuelData,
        result = {
          status: stat_val,
					responseType : "JSON",
          "data": [{"percent" : 0}]
        };
    
    if (response.statusCode == 200 || response.statusCode == 201) {
      fuelData = JSON.parse(body.data);
			if(fuelData.tankLevel.type != "Null"){
				result.data.percent = parseInt(fuelData.tankLevel.value);
			}
			else{
				//this means you asked for fuel for a battery based car
				stat_val = 400;
			}
    } else {
			if(stat_val == 400)
      	result.status = 400; // or whichever error code you think is relevant  
			else
      	result.status = 500; // or whichever error code you think is relevant  
    }
  });
  
  // return new JSON object to client
  res.json(result);
});


//BATTERY LEVEL
app.post('/vehicles/:id/battery', function(req, res) {
  // setup POST request for GM API
	var stat_val = 200;
	if(checkVldIds(re.params.id) == 0)
		stat_val == 400;

	var options = {
    url: 'gmapi.azurewebsites.net/getEnergyService',
    json: true,
    body: {
      id: req.params.id,
      responseType: "JSON"
    }
  };

  // execute POST request to GM API
  requestHTTP.post(options, function(error, response, body) {
    var batteryData,
        result = {
          status: stat_val,
					responseType : "JSON",
          "data": [{"percent" : 0}]
        };
    
    if (response.statusCode == 200 || response.statusCode == 201) {
      batteryData = JSON.parse(body.data);
			if(batteryData.batteryLevel.type != "Null"){
				result.data.percent = parseInt(batteryData.batteryLevel.value);
			}
			else{
				//this means user asked for a battery for a fuel based thingi
				stat_val == 400;
			}

   	  
    } else {
			if(stat_val == 400)
      	result.status = 400; // or whichever error code you think is relevant  
			else
      	result.status = 500; // or whichever error code you think is relevant  
    }
  });
  
  // return new JSON object to client
  res.json(result);
});


//ENGINE VALUE
app.post('/vehicles/:id/engine', function(req, res) {
  // setup POST request for GM API
	var stat_val = 200;
	if(checkVldIds(re.params.id) == 0)
		stat_val == 400;

	var act = "NULL";
	var stat = 500;
	if(req.body.action == "START"){
		act = "START_VEHICLE";
		stat = 200;
	}
 	else if(req.body.action == "STOP"){
		act = "STOP_VEHICLE";
		stat = 200;
	}
	else{ //NULL
		stat_val = 400;
	}
 	var options = {
    url: 'gmapi.azurewebsites.net/actionEngineService',
    json: true,
    body: {
      id: req.params.id,
			action : act, 
      responseType: "JSON"
    }
  };
  // execute POST request to GM API
  requestHTTP.post(options, function(error, response, body) {
    var engineStatus,
        result = {
          status: stat_val,
					responseType : "JSON",
          "data": [{"status" : "NULL"}]
        };
    
    if (response.statusCode == 200 || response.statusCode == 201) {
      engineStatus = JSON.parse(body.data);
			if(engineStatus.actionResult.status == "EXECUTED")
				result.data.status = "success";
			else
				result.data.status = "error";
      
    } else {
 			if(stat_val == 400)
      	result.status = 400; // or whichever error code you think is relevant  
			else
 				result.status = 500; // or whichever error code you think is relevant  
    }
  });
  
  // return new JSON object to client
  res.json(result);
});

app.listen(3000, function(){
	console.log('Running on 3000');
});

