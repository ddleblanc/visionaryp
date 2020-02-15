// //
// // Tests voor versie 1 van de API.
// //
// // Referentie: zie http://chaijs.com/api/bdd/#members-section
// //
// process.env.NODE_ENV = 'test';
// process.env.APP_USERNAME = 'username';
// process.env.APP_PASSWORD = 'password';

// var chai = require('chai');
// var chaiHttp = require('chai-http');
// var server = require('../app.js');
// var chould = chai.should();

// chai.use(chaiHttp);

// describe('Auth API v1', function() {

//     // it('saves a user to mongodb on POST /users/register', function(done) {
//     //     const fd = new FormData();
//     //     const user = {
//     //     username: this.username,
//     //     email: this.email,
//     //     password: this.password
//     //     }
//     //     fd.append('user', JSON.stringify(user));
//     //     chai.request(require('../app.js'))
//     //         .post('/users/register')
//     //         .send(fd)
//     //         .end(function(err, res) {
//     //             res.should.have.status(401);
//     //             res.should.be.json;
//     //             res.body.should.be.a('object');
//     //             res.body.should.have.property('message').equal('No authorization token was found');
//     //             res.body.should.have.property('name').equal('UnauthorizedError');
//     //             done();
//     //         });
//     // });

//     // it('returns UnauthorizedError on GET /api/v1/todos when not logged in', function(done) {
//     //     chai.request(require('../app.js'))
//     //         .get('/routes/users')
//     //         .end(function(err, res) {
//     //             res.should.have.status(401);
//     //             res.should.be.json;
//     //             res.body.should.be.a('object');
//     //             res.body.should.have.property('message').equal('No authorization token was found');
//     //             res.body.should.have.property('name').equal('UnauthorizedError');
//     //             done();
//     //         });
//     // });

//     it('returns an error on POST /users/authenticate with invalid credentials ', function(done) {
//         var user = {
//             username: "invalid",
//             password: "invalid"
//         }
//         chai.request(require('../app.js'))
//             .post('/users/login')
//             .send(user)
//             .end(function(err, res) {
//                 // console.log('######' + JSON.parse(res))
//                 res.should.have.status(404);
//                 // res.should.be.json;
//                 res.body.should.be.an('object');
//                 // res.body.should.have.property('msg').that.is.a('string');
//                 // res.body.msg.should.equal('Invalid username or password.');
//                 done();
//             });
//     });

//     // it('returns a token on POST /api/v1/login', function(done) {
//     //     var user = {
//     //         username: "username",
//     //         password: "password"
//     //     }
//     //     chai.request(server)
//     //         .post('/api/v1/login')
//     //         .send(user)
//     //         .end(function(err, res) {
//     //             res.should.have.status(200);
//     //             res.should.be.json;
//     //             res.body.should.be.an('object');
//     //             res.body.should.have.property('token').that.is.a('string');
//     //             done();
//     //         });
//     // });

// });