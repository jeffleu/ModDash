const models = require('../models/models');
const User = require('./userController');
const googleOAuth = require('./../../setup/googleOAuth.js');
const google = require('googleapis');
const calendar = google.calendar('v3');
const plus = google.plus('v1');
const Event = require('./eventController');
const socket = require('./../../server');
var oauth2Client = googleOAuth.oauth2Client;



const postEventToApi = function(req, res) {
  console.log('body', req.body);
  var id = 2;
  User.getUserTokens(2)
    .then(data => {
      oauth2Client.setCredentials({
        refresh_token: data.dataValues.refreshToken
    });
    oauth2Client.refreshAccessToken((err, tokens) => {
      oauth2Client.setCredentials({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token
      });
      const params = {calendarId: 'primary', auth: oauth2Client, resource: req.body};
      calendar.events.insert(params, function(err, data) {
        if(err) {
          console.log('did not insert to cal', err);
        } else {
          console.log('event saved to g cal!');
          socket.io.on('connection', function(socket) {
            socket.emit('newEvent', data);
          })

        }
      });
      Event.insertEvent(req.body);

    });
  });
}

module.exports = {
  postEventToApi
};
