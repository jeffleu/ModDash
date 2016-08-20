const EventController = require('../db/controllers').EventController;
// const { EventController } = require('../db/controllers');
const googleOAuth = require('../setup/googleOAuth.js');
const pubnub = require('../setup/pubnub.js')
const googleCal = require('./calendar/googleCal')

// function(userId, eventDetails);
const addEvent = function(req, res) {
  return googleOAuth.getUserTokens(req.userId)
  .then((oauth2Client) => {
    return googleCal.insertEvent(oauth2Client, req.body)
  })
  .then(data => {
    // res.send should be in the parent composition function
    res.sendStatus(200);
    pubnub.publishEventAdded(req.userId, data); 
    return EventController.insertEvent(req.userId, data);     
    // make everything look like this insertEvent function
  })
  .catch(err => {
    console.warn('error in addEvent utility function', err);
  });
};

module.exports = addEvent;