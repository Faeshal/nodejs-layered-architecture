require("dotenv").config();
process.env.NODE_ENV = "test";
const server = require("../server");
const incomeService = require("../services/income");
const chai = require("chai");
const chaiHttp = require("chai-http");
const log = require("log4js").getLogger("test:income");
log.level = "debug";
chai.should();
chai.expect();
chai.use(chaiHttp);

describe("Income API", () => {
  // ** GET /api/v1/incomes
  describe("GET /api/v1/incomes", () => {
    it("It should GET all the income", (done) => {
      chai
        .request(server)
        .get("/api/v1/incomes")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eq(true);
          res.body.should.have.property("data").to.be.an("array");
          done();
        });
    });

    it("It should NOT GET all the income", (done) => {
      chai
        .request(server)
        .get("/api/v1/income")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  // ** POST /api/v1/incomes
  describe("POST /api/v1/incomes", () => {
    it("it should POST an income ", async () => {
      let body = {
        name: "sell cocacola",
        value: Math.floor(Math.random() * 101),
      };
      const res = await chai.request(server).post("/api/v1/incomes").send(body);
      res.should.have.status(201);
      res.body.should.be.a("object");
      res.body.should.have.property("success").eq(true);
      res.body.should.have.property("message");
    });

    it("it should not POST an income without value field", async () => {
      let body = {
        name: "buy cocacola",
      };
      const res = await chai.request(server).post("/api/v1/incomes").send(body);
      res.should.have.status(400);
      res.body.should.be.a("object");
      res.body.should.have.property("success").eq(false);
      res.body.should.have.property("message");
    });
  });

  // ** GET /api/v1/incomes/:id
  describe("GET /api/v1/incomes/:id", () => {
    it("it should GET an income by id", async () => {
      const id = 6;
      const res = await chai.request(server).get(`/api/v1/incomes/${id}`);
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("success").eq(true);
      res.body.should.have.property("data").to.be.an("object");
    });

    it("it should not GET an income by id without numeric params", async () => {
      const id = "x";
      const res = await chai.request(server).get(`/api/v1/incomes/${id}`);
      res.should.have.status(400);
      res.body.should.be.a("object");
      res.body.should.have.property("success").eq(false);
      res.body.should.have.property("message");
    });
  });

  // ** PUT /api/v1/incomes/:id
  describe("PUT /api/v1/incomes/:id", () => {
    it("it should PUT an income", async () => {
      // create the data first
      const result = await incomeService.add({
        name: "income property",
        value: Math.floor(Math.random() * 101),
      });
      const { id } = result.dataValues;
      // then update with new data
      const body = {
        name: "passive income property",
        value: Math.floor(Math.random() * 101),
      };
      const res = await chai
        .request(server)
        .put(`/api/v1/incomes/${id}`)
        .send(body);
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("success").eq(true);
      res.body.should.have.property("message");
    });

    it("it should NOT PUT an income with non numeric value field", async () => {
      // create the data first
      const result = await incomeService.add({
        name: "sell ticket",
        value: Math.floor(Math.random() * 101),
      });
      const { id } = result.dataValues;
      // update with wrong data value
      const body = {
        name: "buy cocacola",
        value: "$900",
      };
      const res = await chai
        .request(server)
        .put(`/api/v1/incomes/${id}`)
        .send(body);
      res.should.have.status(400);
      res.body.should.be.a("object");
      res.body.should.have.property("success").eq(false);
      res.body.should.have.property("message");
    });
  });

  // ** DELETE /api/v1/incomes/:id
  describe("DELETE /api/v1/incomes/:id", () => {
    it("it should DElETE an income", async function () {
      // create the data first
      const result = await incomeService.add({
        name: "passive income property",
        value: Math.floor(Math.random() * 101),
      });
      const { id } = result.dataValues;
      // than delete
      const res = await chai.request(server).delete(`/api/v1/incomes/${id}`);
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("success").eq(true);
      res.body.should.have.property("message");
    });

    it("it should NOT DELETE an income with invalid id", async () => {
      const id = 0;
      const res = await chai.request(server).delete(`/api/v1/incomes/${id}`);
      res.should.have.status(400);
      res.body.should.be.a("object");
      res.body.should.have.property("success").eq(false);
      res.body.should.have.property("message");
    });
  });
});
