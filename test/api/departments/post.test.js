const chai = require("chai");
const chaiHTTP = require("chai-http");
const Department = require("../../../models/department.model");
const server = require("../../../server");
chai.use(chaiHTTP);

const expect = chai.expect;
const request = chai.request;

describe("POST /api/departments", () => {
  after(async () => {
    await Department.deleteMany();
  });
  it("/ should insert new document to db and return success", async () => {
    const res = await request(server)
      .post("/api/departments")
      .send({ name: "#Department #1" });
    const newDepartment = await Department.findOne({ name: "#Department #1" });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal("Ok");
    expect(newDepartment).to.not.be.null;
  });
});
