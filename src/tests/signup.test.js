import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";

chai.use(chaiHttp);
chai.should();

describe('user signup', ()=>{
    it('signup user', (done)=>{
        chai.request(app).post('/api/v1/auth/signup').send({
            first_name: "first",
            last_name: "last",
            email:"ade@a.com",
            role:"admin",
            password: "password"
        }).end((err, res)=>{
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('message').equals('user signed sucessfully');
        })
        done();
    })
        it('should check if required field are empty',(done)=>{
            chai.request(app).post('/api/v1/auth/signup').send({
                first_name:"Name", 
                last_name: "Name",
                email: "t@gmail.com",
                role: "",
                password:""
            }).end((err, res) =>{
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('message').equals('all fields are required');
            })
            done();
        })
        it('check if mail exists', (done)=>{
            chai.request(app).post('/api/v1/auth/signup').send({
                first_name: "first",
                last_name: "last",
                email: "ade@g.com",
                role:"admin",
                password: "stuffpass"
            }).end((err, res)=>{
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('message').equals('user already exists');
            })
            done();
        })
        
})