const app = require('./../server/app.js');
const chai = require('chai');
const request = require('supertest');
const expect = chai.expect;

describe('server', () => {
  before((done) => {
    server = app.listen(3030, () => {
      console.log('Test server is listening on 3030');
      setTimeout(function() {
        done();
      }, 3000);
    });
  })

  after(() => {
    server.close();
  })

  describe('/test', () => {
    it('should return 200', (done) => {
      request(server)
      .get('/api/test')
      .expect(200)
      .end((err, res) => {
        done();
      })
    });
  })

  describe('/api/calendar/addEvent', () => {
    it('should return the calendar data object', (done) => {
      // this does not insert the event into the database, it only inserts the event into the calendar, not sure why 
      var body = {
        summary: 'Ballin at the Park',
        location: 'Golden Gate Park, San Francisco', 
        start: {
          dateTime: '2016-08-16T22:30:00-07:00',
          timeZone: 'America/Los_Angeles'
        },
        end: {
          dateTime: '2016-08-16T23:30:00-07:00',
          timeZone: 'America/Los_Angeles'
        }
      };
      request(server)
      .post('/api/calendar/addEvent')
      .send(body)
      // BE CAREFUL ABOUT SEND, IT IS THE REQ.BODY, AND SUPERTEST WILL STRINGIFY OBJECT FOR YOU
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res.body.status).to.equal('confirmed');
        done();
      })
    });
  });


})