import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  authenticateUser,
  getUserEntries
} from "../controllers/controllers.users.js";

import { users } from "../models/usersModel.js";
import chaiHttp from 'chai-http';
import { describe, it } from "mocha";
import chai from 'chai';
import app from "../app.js"

// describe("Test /users", ()=>{
//   it("gets all users",async ()=>{
//     const actual = await getUsers()
//     expect(actual).to.deep.include({"username": "ghonny"})
//   })

// })


// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Users", () => {
    describe("GET /", () => {
        // Test to get all users
        it("should get all users", (done) => {
             chai.request(app)
                 .get('/users')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('array');
                     done();
                  });
         });
        // Test to get a single user
        it("should get a single user", (done) => {
             const id = "6d7bf107-b7bf-4966-89b7-64b40ced9d10";
             chai.request(app)
                 .get(`/users/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
         
        // Test to see if wrong id sends correct error code
        it("If id is wrong, send error code", (done) => {
             const id = 5;
             chai.request(app)
                 .get(`/users/${id}`)
                 .end((err, res) => {
                     res.should.have.status(500);
                     done();
                  });
         });
    });
});