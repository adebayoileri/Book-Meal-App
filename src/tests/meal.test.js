import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server"

chai.use(chaiHttp);
chai.should();

describe('meals endpoints test',()=>{
    it('should create a meal', (done) =>{
        chai.request(app).get('/api/v1/meals').end((err, res)=>{
            res.should.have.status(200)
            res.body.should.have.property('status').equals('success');
            res.body.should.have.property('code').equals(200);
            res.body.should.have.property('message').equals('got all meals successfully')
        })
        done();
    })

    it('get one meal', (done)=>{
        chai.request(app).get('/api/v1/meals/1').end((err, res)=>{
            res.should.have.status(200);
            res.body.should.have.property('message').equals('get one meal succesfully')
        })
        done()
    })
})