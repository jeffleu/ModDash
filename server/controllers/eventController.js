const Event = require('../db/queries').Event;
const addEvent = require('../utility/calendar/addEvent');
const addTravel = require('../utility/map/addTravel');
const queryTraffic = require('../workers/queryTraffic');
const google = require('googleapis');
const googleAuth = require('../utility/auth/googleAuth');
const Promise = require('bluebird');
const calendar = google.calendar('v3');
calendar.events.list = Promise.promisify(calendar.events.list);

const addEventAndAddTravel = (req, res) => {
  addEvent(req.userId, req.body)
  .spread((event, created) => {
    res.sendStatus(200);
    console.log('Event successfully added. Now adding travel.\n', event.dataValues);
    return addTravel(event);
  })
  .then(travel => {
    console.log('Travel successfully added. Now scheduling queryTraffic worker.');
    queryTraffic(travel);
  });
};

const getDayEvents = (req, res) => {
  // console.log('in get day events', req.session);
  // req.session.regenerate(() => {
    // req.session.something = 'something';
    // console.log('after regenerating', req.session);  
  Event.retrieveDayEvent(req.userId)
  .then(datas => {
    res.send(datas);
  });
  // })
};

// Currently not in use. Need to fix this.
const getAllEventsFromCalendar = (req, res) => {
  return googleAuth.getUserTokens(req.userId)
  .then(oauth2Client => {
    calendar.events.list({
      auth: oauth2Client,
      calendarId: 'primary',
      singleEvents: true,
      minTime: Date.now()
      // not sure about the params to get all events or get new events that we don't have yet.
    })
    .then(data => {
      data.items.forEach(event => {
        Event.insertEvent(event, userId);
      });
      
      res.send(data.items);      
    });
  });
};

module.exports = {
  addEventAndAddTravel,
  getDayEvents,
  getAllEventsFromCalendar
};
