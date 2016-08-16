const app = require('./../server/app.js');
const server = require('http').Server(app);
const chai = require('chai');
const request = require('supertest');

var url = 'http://localhost:3030'

describe('server', () => {
  before((done) => {
    server.listen(3030, () => {
      // console.log('Test server is listening on 3030');
      done();
    });
  })

  describe('/api/calendar/addEvent', () => {
    // it('should return 201', (done) => {
    //   request(server)
    //   .post('/api/calendar/addEvent')
    //   .expect(201)
    //   .end((err, res) => {
    //     // console.log(res);
    //     if (err) {
    //       console.warn(err);
    //     }
    //     done();
    //   });
    // });

    it('should return some data', (done) => {

      var event = {
        summary: 'Ballin at the Park',
        location: 'Golden Gate Park', 
        start: {
          dateTime: '2016-08-16 22:30:00-07:00',
          timeZone: 'America/Los_Angeles'
        },
        end: {
          dateTime: '2016-08-16 23:30:00-07:00',
          timeZone: 'America/Los_Angeles'
        }
      }

      console.log(event);
      request(server)
      .post('/api/calendar/addEvent')
      .send(JSON.stringify(event))
      .expect(201)
      .end((err, res) => {
        console.log(res);
        done();
      })
    });
  });


  after(() => {
    server.close();
    // console.log('Test server is closed');
  })
})