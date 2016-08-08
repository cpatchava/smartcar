var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("Call to the vehicles API",function(){

  // #1 should return home page

  it("id 1234 gets status of battery/fuel",function(done){

    // calling smartcar get car info api
    server
    .get("/vehicles/1234")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.data.percent.should.equal(30);
			done();
    });
  });

  it("id 1235 gets status of battery/fuel",function(done){

    // calling smartcar get car info api
    server
    .get("/vehicles/1235")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
		  res.body.data.percent.should.equal(50);
      done();
    });
  });

});
