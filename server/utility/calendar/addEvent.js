const Event = require('../../db/queries').Event;
const googleAuth = require('../auth/googleAuth');
const pubnub = require('../../utility/notification/pubnub');
const googleCal = require('./googleCal');

const addEvent = (userId, eventDetails) => {
  return googleAuth.getUserTokens(userId)
  .then(oauth2Client => googleCal.insertEvent(oauth2Client, eventDetails))
  .then(data => {
    pubnub.publishEventAdded(userId, data);
    return Event.insertEvent(userId, data);
  });
};

module.exports = addEvent;