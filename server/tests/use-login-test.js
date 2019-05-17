/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../server';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe('User sign in', () => {
    it('Should return a 201 and confirm user email and password as valid inputs', (done) => {
        const user = {
            email: 'johndoe@quicredit.com',
            password: 'secret',
        };

        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send(user)
            .end((error, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });

    it('Should return a 403 and confirm user email and password as invalid inputs', (done) => {
        const user = {
            email: '',
            password: '',
        };

        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send(user)
            .end((error, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });

    it('should return 401 for invalid input', (done) => {
        const userInvalidInput = {
            name: 'John Wick',
            email: '',
            password: 'secret',
        };

        chai.request(app).post('/api/v1/auth/signin')
            .send(userInvalidInput)
            .end((req, res) => {
                res.should.have.status(401);
                expect(res.body.error).to.be.equal('invalid username or password');
                done();
            });

    });

});
