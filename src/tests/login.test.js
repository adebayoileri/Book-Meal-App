import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";

chai.use(chaiHttp);
chai.should();

describe('user login', ()=>{
        it('should check if required field is empty',(done)=>{
            chai.request(app).post('/api/v1/auth/login').send({
                email: "",
                password:"stuff"
            }).end((err, res) =>{
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('message').equals('email and password are required');
            })
            done();
        });
        it('should login user',(done)=>{
            chai.request(app).post('/api/v1/auth/login').send({
                email: "name@g.com",
                password:"password"
            }).end((err, res) =>{
                // res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('message').equals('user signed sucessfully');
            })
            done();
        });
})