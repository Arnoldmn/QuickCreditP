import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../server';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe('Test if routes exist', () => {
    it('/GET should return 200 and a message', (done) => {
        chai.request(app).get('/')
            .end((req, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.equal('Get loans with a good interest');
                done();
            });
    })

});
