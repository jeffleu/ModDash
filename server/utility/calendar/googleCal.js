const Promise = require('bluebird');
const google = require('googleapis');
var calendar = google.calendar('v3');

calendar.events.insert = Promise.promisify(calendar.events.insert);
calendar.events.list = Promise.promisify(calendar.events.list);

const insertEvent = (auth, resource) => {
  var params = {
    calendarId: 'primary', 
    auth,
    resource
  };
  
  return calendar.events.insert(params);
};

module.exports = {
  insertEvent
};
