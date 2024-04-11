const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

// const server = require("../index");

chai.use(chaiHttp);

const API_BASE_URL = process.env.BASE_SERVER_URL;

describe("/GET testing UserInfo", () => {
    it("Retrieves the user info and user holdings in CoinDCX", (done) => {
        chai.request(API_BASE_URL).get("/api/v1/UserInfo/get").end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.should.have.property("userInfo");
            res.body.userInfo.should.have.property("userName"),
                res.body.userInfo.should.have.property("userHoldings"),
                res.body.status.should.contain("ok");
            done();
        })
    });
});