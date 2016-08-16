const UserController = require('./../db/controllers/userController');
const googleOAuth = require('./../setup/googleOAuth.js');
const google = require('googleapis');
const calendar = google.calendar('v3');
const EventController = require('./../db/controllers/eventController');
var oauth2Client = googleOAuth.oauth2Client;
const pubnub = require('./../setup/pubnub.js')

const Promise = require('bluebird');
calendar.events.insert = Promise.promisify(calendar.events.insert);

const addEvent = function(req, res) {
  var userId = 2;

  return UserController.getUserTokens(userId)
  .then(() => {
    const params = {calendarId: 'primary', auth: oauth2Client, resource: req.body};
    return params;
  })
  .then(params => {
    return calendar.events.insert(params)
  })
  .then(data => {
    res.send(data);
    pubnub.publish(
      {
        message: data,
        channel: 'eventAdded',
        sendByPost: false, // true to send via post
        storeInHistory: false, //override default storage options
        meta: {} // publish extra meta with the request
      },
      function (status, response) {
          // handle status, response
          console.log('pubnub notification "eventAdded" was sent to client');
      }
    );
    return data;     
  })
  .then(data => {
    return data;
  })
  .then(data => {
    return EventController.insertEvent(data, userId);
  })
  .catch(err => {
    console.warn('error in addEvent utility function', err);
  });
};

module.exports = addEvent