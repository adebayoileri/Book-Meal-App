// import chai from 'chai';
// import chaiHttp from 'chai-http';

// import app from '../server';


// chai.use(chaiHttp);
// chai.should();

// describe('REGISTER', () => {
//     describe('Sign up', () => {
//         it('should check if body value is empty', (done) => {
//             chai.request(app)
//             .post('/api/v1/auth/sign-up')
//             .send({
//                 firstName: '',
//                 lastName: 'i',
//                 category: 'caterer', 
//                 email: '@email.comm',
//                 password: '12345678'
//             })
//             .end((err, res) => {
//                 res.should.have.status(401);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('status');
//                 res.body.should.have.property('data');
//             })
//             done();
//         })

//         it('should validate email', (done) => {
//             chai.request(app)
//             .post('/api/v1/auth/sign-up')
//             .send({
//                 firstName: 'mohammed',
//                 lastName: 'ibrahim',
//                 category: 'caterer', 
//                 email: 'incorrectemail.lom',
//                 password: '12345678'
//             })
//             .end((err, res) => {
//                 res.should.have.status(401);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('status');
//                 res.body.should.have.property('data');
//             })
//             done();
//         })

//         it('should check if user exists', (done) => {
//             chai.request(app)
//             .post('/api/v1/auth/sign-up')
//             .send({
//                 firstName: 'mohammed',
//                 lastName: 'ibrahim',
//                 category: 'caterer', 
//                 email: '@email.comm',
//                 password: '12345678'
//             })
//             .end((err, res) => {
//                 res.should.have.status(401);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('status');
//                 res.body.should.have.property('data');
//             })
//             done();
//         })

//         it('should sign up admin user', (done) => {
//             chai.request(app)
//             .post('/api/v1/auth/sign-up')
//             .send({
//                 firstName: 'mohammed',
//                 lastName: 'ibrahim',
//                 category: 'caterer', 
//                 email: 'ibrahimmohamme@email.com',
//                 password: '12345678'
//             })
//             .end((err, res) => {
//                 res.should.have.status(201);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('status');
//                 res.body.should.have.property('data');
//             })
//             done();
//         })
//     })
// })