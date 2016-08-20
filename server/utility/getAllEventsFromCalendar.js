const Event = require('../db/queries').Event;
const google = require('googleapis');
const calendar = google.calendar('v3');
const googleOAuth = require('../setup/googleOAuth');
const Promise = require('bluebird');

calendar.events.list = Promise.promisify(calendar.events.list);

// currently not in use, need to fix this
const getAllEventsFromCalendar = (req, res) => {
  return googleOAuth.getUserTokens(req.userId)
  .then(data => {
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

module.exports = getAllEventsFromCalendar;
