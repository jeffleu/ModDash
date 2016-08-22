const googleAuth = require('../auth/googleAuth');
const google = require('googleapis');
var calendar = google.calendar('v3');
const Promise = require('bluebird');

calendar.events.insert = Promise.promisify(calendar.events.insert);
calendar.events.list = Promise.promisify(calendar.events.list);

const addEventToGoogleCal = (userId, event) => {
  return googleAuth.getUserTokens(userId)
  .then(oauth2Client => {
    var params = {
      calendarId: 'primary', 
      auth: oauth2Client,
      resource: eventDetails
    };
    return calendar.events.insert(params);
  })
  .catch(err => {
    console.warn('error in adding event to Google Calendar:', err);
  });
};

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

module.exports = {
  addEventToGoogleCal,
  getAllEventsFromGoogleCal
};
