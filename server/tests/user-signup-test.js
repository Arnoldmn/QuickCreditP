/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../server';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe('User sign up', () => {
  it('Should return a 201 and confirm user valid input', (done) => {
    /**
     * request new user input
     */
    const newUser = {
      email: 'johndoe@quicredit.com',
      firstname: 'john',
      lastname: 'doe',
      password: 'secret',
      address: 'Gisozi',
    };
    /**
     * send  user request
     */
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((_data, res) => {
        expect(res.body.data).to.have.property('email');
        expect(res.body.data).to.have.property('firstname');
        expect(res.body.data).to.have.property('lastname');
        expect(res.body.data).to.have.property('password');
        expect(res.body.data).to.have.property('address');
        expect(res.body.data).to.have.property('status');
        done();
      });
  });

  it('Should return error 401 when email is already registered', (done) => {
    const newUser = {
      email: 'johndoe@quicredit.com',
      firstname: 'john',
      lastname: 'doe',
      password: 'secret',
      address: 'Gisozi',
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser)
      .end((req, res) => {
        expect(res).to.have.status(409);
        expect(res.body.error).to.be.equal('User already exists');
        done();
      });
  });
});
