const Promise = require('bluebird');
const google = require('googleapis');
var calendar = google.calendar('v3');

calendar.events.insert = Promise.promisify(calendar.events.insert);
calendar.events.list = Promise.promisify(calendar.events.list);
calendar.events.delete = Promise.promisify(calendar.events.delete);

const insertEvent = (auth, resource) => {
  var params = {
    calendarId: 'primary',
    auth,
    resource
  };

  return calendar.events.insert(params);
};

const deleteEvent = (auth, event) => {

  var params = {
    calenderId: 'primary',
    auth,
    eventId: event
  };
  return calendar.events.delete(params);
};

module.exports = {
  insertEvent,
  deleteEvent
};
