const chai = require("chai");
const chaiHTTP = require("chai-http");
const Department = require("../../../models/department.model");
const server = require("../../../server");
chai.use(chaiHTTP);

const expect = chai.expect;
const request = chai.request;

describe("DELETE /api/departments", () => {
  before(async () => {
    const testDepOne = new Department({
      _id: "5d9f1140f10a81216cfd4408",
      name: "Department #1",
    });
    await testDepOne.save();
  });

  after(async () => {
    await Department.deleteMany();
  });
  it("/:id should delete document from db and return success", async () => {
    const res = await request(server).delete(
      "/api/departments/5d9f1140f10a81216cfd4408"
    );
    const department = await Department.findOne({
      _id: "5d9f1140f10a81216cfd4408",
    });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal("Deleted");
    expect(department).to.be.null;
  });
});
