var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("Call to the vehicles API, CAR INFO",function(){

  // #1 should return home page

  it("should return JSON object with vin, color, doorcount, drivetrain with id 1",function(done){

    // calling smartcar get car info api
    server
    .get("/vehicles/1234")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.data.vin.should.equal("1213231");
      res.body.data.color.should.equal("Metallic Silver");
      res.body.data.doorCount.should.equal(4);
      res.body.data.driveTrain.should.equal("v8");
      done();
    });
  });

  it("should return JSON object with vin, color, doorcount, drivetrain with id 2",function(done){

    // calling smartcar get car info api
    server
    .get("/vehicles/1235")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.data.vin.should.equal("1213231");
      res.body.data.color.should.equal("Metallic Silver");
      res.body.data.doorCount.should.equal(4);
      res.body.data.driveTrain.should.equal("v8");
      done();
    });
  });

});
