import chaiHttp from "chai-http";
import chai from "chai";
import app from "../server";

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe("User sign up", () => {
  it("Should return a 201 and confirm user a valid input", done => {

    const newUser = {
      email: "johndoe@quicredit.com",
      firstname: "john",
      lastname: "doe",
      password: "secret",
      addres: "Gisozi"
    };

    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(newUser)
      .end((error, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
