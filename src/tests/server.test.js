import chai, { should } from "chai"
import chaiHttp from "chai-http";
import app from "../server";

chai.use(chaiHttp)
chai.should()

describe('server test', ()=>{
    it('should send json message on server start', (done)=>{
        chai.request(app).get('/').end((err, res) =>{
            res.body.should.have.property('message').equals('welcome to the mealbookingapp api')
            res.should.have.status(200)
        })
        done()
    })
})