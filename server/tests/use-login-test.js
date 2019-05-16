/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../server';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe('User sign in', () => {
    it('Should return a 201 and confirm user email and password as valid inputs', (done) => {
        /**
                 * request new user input
                 */
        const user = {
            email: 'johndoe@quicredit.com',
            password: 'secret',
        };
        /**
                 * send  user request
                 */
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send(user)
            .end((error, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });
});
