const models = require('../models/models');
const Event = models.Event;
const googleMaps = require('./../../utility/googleMaps');
const moment = require('moment');
const zone = require('moment-timezone');
const sequelize = require('../db.js');
// const User = require('./userController');,
// const google = require('googleapis');
// var calendar = google.calendar('v3');
// const googleOAuth = require('./../../setup/googleOAuth');
// var oauth2Client = googleOAuth.oauth2Client;

const insertEvent = function(data, userId) {
  console.log('in here', data);
  Event.findOrCreate({
    where: {googleCalendarEventId: data.id},
    defaults: {
      userId: userId,
      name: data.summary,
      eventUrl: data.htmlLink,
      startdatetime: data.start.dateTime,
      enddatetime: data.end.dateTime,
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
  var now = moment().utcOffset(0000).format('YYYY-MM-DD HH:mm') + ':00+00';
  var nextMidnight = moment();
  nextMidnight  = nextMidnight.add(1, 'days');
  nextMidnight = nextMidnight.format('YYYY-MM-DD');
  console.log('next', nextMidnight);
  // var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
  console.log('now', now);
  var queryString = `SELECT * FROM events WHERE startdatetime BETWEEN '${now}' AND '${nextMidnight} 06:59:00+00'`;
  sequelize.query(queryString)
  .spread((datas, metadata) => {
    datas.forEach((data) => {
      data.startdatetime = moment(data.startdatetime).format('LT');
    })
    res.send(datas);
  })
}

const retrieveDayEvent = () => {
  sequelize.query(`SELECT * FROM events`).
    spread(data, metadata, (data) => {

    });
};

module.exports = {
  insertEvent,
  retrieveEvent,
  retrieveDayEvent
};

