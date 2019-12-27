const app = require("../app");
const supertest = require("supertest");
const { expect } = require("chai");

describe("GET /app", () => {
  it("should return an array of apps", () => {
    return supertest(app)
      .get("/apps")
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf.at.least(1);
        const googleApp = res.body[0];
        expect(googleApp).to.include.all.keys(
          "App",
          "Rating",
          "Reviews",
          "Size",
          "Content Rating",
          "Genres"
        );
      });
  });

  it("should sort by app", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: "app" })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).to.be.an("array");
        let sorted = true;

        let i = 0;
        
        while (i < res.body.length - 1) {
          const appAtI = res.body[i];
          const appAtIPlus1 = res.body[i + 1];

          if (appAtIPlus1.title < appAtI.title) {
            sorted = false;
            break; 
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
});
