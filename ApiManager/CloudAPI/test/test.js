import supertest from 'supertest';
// app is supposed to point to the app.js file
import {app, server} from '../api.js'

after( function (done) {
    server.close(done)
})

describe("GET /healthcheck", function() {
    it("it should has status code 200", function(done) {
      supertest(app)
        .get("/healthcheck_IU3AHD9H")
        .expect(200,done)
    });
  });

