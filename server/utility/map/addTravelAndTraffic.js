const addTravel = require('./addTravel');
const queryTraffic = require('../../workers/queryTraffic');
const Event = require('../../db/queries').Event;

const addToTravelAndTraffic = (userId) => {
  return Event.getAllUserEvents(userId)
  .then(events => {
    events.forEach(event => {
      return addTravel(event)
      .then(travel => {
        return queryTraffic(travel);
      });
    });
  })
  .catch(err => {
    console.warn('error in adding inital user events to travel & traffic', err);
  });
};

module.exports = addToTravelAndTraffic;