const EventController = require('../db/controllers').EventController;
// const { EventController } = require('../db/controllers');
const googleOAuth = require('../setup/googleOAuth.js');
// const google = require('googleapis');
// const calendar = google.calendar('v3');
// var oauth2Client = googleOAuth.oauth2Client;
const pubnub = require('../setup/pubnub.js')
const googleCal = require('./calendar/googleCal')
// const Promise = require('bluebird');

// calendar.events.insert = Promise.promisify(calendar.events.insert);
// function(userId, eventDetails);
const addEvent = function(req, res) {
  // lines 15?-18 should be refactored into a calendar function
  return googleOAuth.getUserTokens(req.userId)
  .then((oauth2Client) => {
    return googleCal.insertEvent(oauth2Client, req.body);
    // .then(data => {
    //   return data;
    // });
    // const params = {calendarId: 'primary', auth: oauth2Client, resource: req.body}; 
    // .insert(params)
    // turn this into a google calendar function module
  })
  .then(data => {
    // res.send should be in the parent composition function
    // res.send(data);
    pubnub.publishEventAdded(req.userId, data); 
    return EventController.insertEvent(req.userId, data);     
    // make everything look like this insertEvent function
  })
  .catch(err => {
    console.warn('error in addEvent utility function', err);
  });
};

module.exports = addEvent;