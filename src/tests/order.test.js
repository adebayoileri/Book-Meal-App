import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";

chai.use(chaiHttp);
chai.should()

describe('order tests', ()=>{
    it('should get all order', (done)=>{
        chai.request(app).get('/orders').set('Authorization', `bearer ${process.env.TEST_TOKEN}`).end((err, res) =>{
            res.should.have.status(200);
            res.body.should.have.property('status').eqls('success');
            res.body.should.have.property('message').eqls('got all orders');
        })
        done();
    })
    it('should get an order', (done)=>{
        chai.request(app).get('/orders/7832899823ifh42').set('Authorization', `bearer ${process.env.TEST_TOKEN}`).end((err, res) =>{
            res.should.have.status(200);
            res.body.should.have.property('status').eqls('success');
            res.body.should.have.property('message').eqls('got an order successfully');
            res.body.should.be.a('object')
        })
        done();
    })
})