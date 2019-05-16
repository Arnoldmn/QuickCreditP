import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../server';

chai.should();
chai.use(chaiHttp);
const token = '';
const userToken = '';
const { expect } = chai;

describe('Test loan endpoints', () => {
    it("Return all loans ", done => {
        chai
            .request(app)
            .post("/api/v1/auth/signin")
            .send({
                email: "admin@quickcredit.com",
                password: "mna.mna"
            })
            .end((err, res) => {
                chai
                    .request(app)
                    .get("/api/v1/loans")
                    .set({ email: "admin@quickcredit.com", password: "1234567" })
                    .end((error, data) => {
                        data.should.have.status(200);
                        done();
                    });
            });
    });

    it("Should post loan application", done => {
        chai
            .request(app)
            .post("/api/v1/auth/signin")
            .send({
                email: "admin@quickcredit.com",
                password: "mna.mna"
            })
            .end((err, res) => {
                chai
                    .request(app)
                    .post("/api/v1/loans/apply")
                    .set({ email: "admin@quickcredit.com", password: "1234567" })
                    .send({
                        tenor: "5",
                        amount: 450000.0,
                        installment: 10000.0,
                        balance: 560000
                    })
                    .end((error, data) => {
                        data.should.have.status(403);
                        done();
                    });
            });
    });

    it("Return specific loan based on it id", done => {
        chai
            .request(app)
            .post("/api/v1/auth/signin")
            .send({
                email: "admin@quickcredit.com",
                password: "mna.mna"
            })
            .end((err, res) => {
                chai
                    .request(app)
                    .post("/api/v1/loans")
                    .set({ email: "admin@quickcredit.com", password: "1234567" })
                    .send({
                        tenor: "3",
                        amount: 250000.0,
                        installment: 9000.0,
                        balance: 360000
                    })
                    .end((error, data) => {
                        chai
                            .request(app)
                            .get("/api/v1/loans/:id")
                            .set({ email: "admin@quickcredit.com", password: "1234567" })
                            .end((errors, response) => {
                                response.should.have.status(403);
                                done();
                            });
                    });
            });
    });

    it("Return  all loans that are not fully settled", done => {
        chai
            .request(app)
            .post("/api/v1/auth/signin")
            .send({
                email: "admin@quickcredit.com",
                password: "mnpd@123"
            })
            .end((err, res) => {
                chai
                    .request(app)
                    .get("/api/v1/unrepaid/loans")
                    .set({ email: "admin@quickcredit.com", password: "1234567" })
                    .query({ status: "approved", repaid: "false" })
                    .end((error, data) => {
                        data.should.have.status(404);
                        done();
                    });
            });
    });

    it("Return loans that are not fully repaid", done => {
        chai
            .request(app)
            .post("/api/v1/auth/signin")
            .send({
                email: "mnpde@yahoo.com",
                password: "mnpd@123"
            })
            .end((err, res) => {
                chai
                    .request(app)
                    .get("/api/v1/repaid/loans")
                    .set({ email: "admin@quickcredit.com", password: "1234567" })
                    .query({ status: "approved", repaid: "true" })
                    .end((error, data) => {
                        data.should.have.status(403);
                        done();
                    });
            });
    });

    it("Post loan repayment based on it id", done => {
        chai
            .request(app)
            .post("/api/v1/auth/signin")
            .send({
                email: "admin@quickcredit.com",
                password: "mnpd@123"
            })
            .end((err, res) => {
                chai
                    .request(app)
                    .post("/api/v1/loans")
                    .set({ email: "admin@quickcredit.com", password: "1234567" })
                    .send({
                        tenor: "3",
                        amount: 250000.0,
                        installment: 9000.0,
                        balance: 360000
                    })
                    .end((error, data) => {
                        chai
                            .request(app)
                            .post("/api/v1/loans/:id/repayment")
                            .set({ email: "admin@quickcredit.com", password: "1234567" })
                            .send({
                                paidAmount: 5000.0
                            })
                            .end((rerrors, response) => {
                                response.should.have.status(403);
                                done();
                            });
                    });
            });
    });

    it("Should return all loans history", done => {
        chai
            .request(app)
            .post("/api/v1/auth/signin")
            .send({
                email: "admin@quickcredit.com",
                password: "mnpd@123"
            })
            .end((err, res) => {
                chai
                    .request(app)
                    .post("/api/v1/loans")
                    .set({ email: "admin@quickcredit.com", password: "1234567" })
                    .send({
                        tenor: "3",
                        amount: 250000.0,
                        installment: 9000.0,
                        balance: 360000
                    })
                    .end((error, data) => {
                        chai
                            .request(app)
                            .get("/api/v1/loans/:id/repayment")
                            .set({ email: "admin@quickcredit.com", password: "1234567" })
                            .end((rerrors, response) => {
                                response.should.have.status(404);
                                done();
                            });
                    });
            });
    });

    it("Should return loan status", done => {
        chai
            .request(app)
            .post("/api/v1/auth/signin")
            .send({
                email: "admin@quickcredit.com",
                password: "mnpd@123"
            })
            .end((err, res) => {
                chai
                    .request(app)
                    .put("/api/v1/loans/:id")
                    .set({ email: "admin@quickcredit.com", password: "1234567" })
                    .send({
                        status: "rejected"
                    })
                    .end((error, data) => {
                        data.should.have.status(200);
                        done();
                    });
            });
    });
});
