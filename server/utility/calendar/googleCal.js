const Promise = require('bluebird');
const google = require('googleapis');
var calendar = google.calendar('v3');

calendar.events = Promise.promisifyAll(calendar.events);

const insertEvent = (auth, resource) => {
  let params = {
    calendarId: 'primary', 
    auth,
    resource
  };
  return calendar.events.insert(params)
  .then(data => data);
  // .then(data => data);
}

module.exports = {
  insertEvent
};
