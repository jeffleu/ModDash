const models = require('../models/models');
const Event = models.Event;
const Sequelize = require('sequelize');
const googleMaps = require('./../../utility/googleMaps');
// const User = require('./userController');
// const google = require('googleapis');
// var calendar = google.calendar('v3');
// const googleOAuth = require('./../../setup/googleOAuth');
// var oauth2Client = googleOAuth.oauth2Client;

const insertEvent = function(data, userId) {
  Event.findOrCreate({
    where: {googleCalendarEventId: data.id},
    defaults: {
      userId: userId,
      name: data.summary,
      eventUrl: data.htmlLink,
      startDateTime: data.start.dateTime,
      endDateTime: data.end.dateTime,
      recurrence: JSON.stringify(data.recurrence),
      // currently not checking for recurrence since the calendar events query has "single events: true" which lists every single event
      location: data.location,
      description: data.description
    }})
  .spread(function(event, created) {
    console.log(created, ': event was created');

    // query Google Maps for initial travel time, see utility/googleMaps
    googleMaps.getInitialTravelTime(event);
  });
}

const retrieveEvent = function(id) {
  return Event.findOne({
    where: {id: id}
  })
}

const retrieveDayEvent = function(req, res) {
  // let date = new Date();
  // let lastMidnight = date.setHours(0,0,0,0).toUTCString();
  // let nextMidnight = date.setHours(24,0,0,0);
  // var start = new Date();
  // start.setHours(0,0,0,0);
  //
  // var end = new Date();
  // end.setHours(23,59,59,999);
  //
  // var now = new Date();
  //   console.log('now', now);
  // console.log('end', end.toUTCString());
  var day = new Date();
  Event.findAll({
    where: {  startDateTime: {
      between: [Date.parse('2016-08-08'), new Date()]
        } 
      }
    })
    .then(function (result) {
    // do stuff here
    console.log('result', result);
  });
}

module.exports = {
  insertEvent,
  retrieveEvent,
  retrieveDayEvent
}
