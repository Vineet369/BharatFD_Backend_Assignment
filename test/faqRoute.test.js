import * as chai from "chai";
import chaiHttp from "chai-http";
import {app} from "../src/app.js";  
const { expect } = chai;

chai.use(chaiHttp);

describe("FAQ API Tests", () => {
  it("should fetch FAQs in English", (done) => {
    chai
      .request(app)
      .get("/api/faq/getFaqs?lang=en")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should return FAQs in hindi when requested", (done) => {
    chai
      .request(app)
      .get("/api/faq/getFaqs?lang=es")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});
