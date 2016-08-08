var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("Call to the vehicles API, START/STOP",function(){

  // #1 should return home page

  it("id 1234 start car passed",function(done){

    // calling smartcar get car info api
    server
    .get("/vehicles/1234")
		.send("START")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.data.status.should.equal("success");
			done();
    });
  });

	it("id 1234 stop car passed",function(done){

    // calling smartcar get car info api
    server
    .get("/vehicles/1234")
		.send("STOP")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.data.status.should.equal("success");
			done();
    });
  });

	it("id 1234 start car failed",function(done){

    // calling smartcar get car info api
    server
    .get("/vehicles/1234")
		.send("START")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.data.status.should.equal("error");
			done();
    });
  });

	it("id 1234 stop car failed",function(done){

    // calling smartcar get car info api
    server
    .get("/vehicles/1234")
		.send("STOP")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.data.status.should.equal("error");
			done();
    });
  });


});
