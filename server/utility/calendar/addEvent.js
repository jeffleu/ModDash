const Event = require('../../db/queries').Event;
const googleOAuth = require('../../setup/googleOAuth.js');
const pubnub = require('../../setup/pubnub.js');
const googleCal = require('./googleCal');

const addEvent = (userId, eventDetails) => {
  return googleOAuth.getUserTokens(userId)
  .then(oauth2Client => googleCal.insertEvent(oauth2Client, eventDetails))
  .then(data => {
    pubnub.publishEventAdded(userId, data);
    return Event.insertEvent(userId, data);
  });
};

module.exports = addEvent;