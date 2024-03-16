const chai=require("chai")
const {server}=require("../index")
const chaiHttp=require("chai-http")
const { response } = require("express")

//assertion style
chai.should()

//making the request to the API endpoints
chai.use(chaiHttp)

let score=1

describe("Testing APIs", ()=>{
    //All the API test cases will be written 

     // Testing GET route
     describe("GET /users", ()=>{
        it("should GET all the users", (done)=>{
            chai.request(server)
               .get("/users")
               .end((err,response)=>{
                  //status code
                  response.should.have.status(200)
                  //array as a response
                  response.body.should.be.a("array")
                  //length should be greater than 2 atleat
                  response.body.should.have.length.above(2)
               })
               score += 2
                 done()
                 console.log("Final Score",score)
        })
     })

     //Testing GET by id route
       describe("GET /users/:userID", ()=>{
         it("should GET the user by ID",(done)=>{
            const userID=4;
            chai.request(server)
               .get(`/users/${userID}`)
               .end((err,response)=>{
                 //status code
                 response.should.have.status(200)
                 //it should be an object
                 response.body.should.be.a("object")
                 //id
                 response.body.should.have.property("id")
                 //name
                 response.body.should.have.property("name")
                 //city
                 response.body.should.have.property("city")
                 //age
                 response.body.should.have.property("age")
                 //id should be equal to userID(in this case id=4)
                 response.body.should.have.property("id").eq(userID)
               })
               score+=2
               done()
               console.log("Final Score",score)
         })
       })
})