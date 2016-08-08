var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("Call to the vehicles API, CAR DOORS",function(){

  // #1 should return home page

  it("id 1234 gets status of doors",function(done){

    // calling smartcar get car info api
    server
    .get("/vehicles/1234")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.data[0].location.should.equal("frontLeft");
      res.body.data[0].locked.should.equal(true);
      res.body.data[1].location.should.equal("frontRight");
      res.body.data[1].locked.should.equal(true);
			done();
    });
  });

  it("id 1235 gets status of doors",function(done){

    // calling smartcar get car info api
    server
    .get("/vehicles/1235")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
		  res.body.data[0].location.should.equal("frontLeft");
      res.body.data[0].locked.should.equal(true);
      res.body.data[1].location.should.equal("frontRight");
      res.body.data[1].locked.should.equal(true);
      done();
    });
  });

});
