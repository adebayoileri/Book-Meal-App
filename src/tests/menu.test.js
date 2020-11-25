import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";

chai.use(chaiHttp);
chai.should();

describe('Menu tests',()=>{
    it('should get menu',(done) =>{
        chai.request(app).get('/api/v1/menu').end((err, res)=>{
            res.should.have.status(200);
            res.body.should.have.property('code').equals(200)
            res.body.should.have.property('status').equals('success')
        })
        done()
    })
    it('add meal to menu', (done)=>{
        chai.request(app).post('/api/v1/menu').send({
            meal_id : "1"
        }).set('Authorization', `bearer ${process.env.TEST_TOKEN}`)
        .end((err, res)=>{
            res.should.have.status(201);
            res.body.should.have.property('message').equals('menu created')
        })
        done()
    })
})