const Travel = require('../db/queries').Travel;
const User = require('../db/queries').User;
const requestPromise = require('request-promise');
const googleMap = require('./map/googleMap');

const addTravel = event => {
  return User.getUserInfo(event.dataValues.userId)
  .then(data => requestPromise(googleMap.mapTravel(data, event))) // Request to Google Maps API for travel data
  .then(body => {
    // requestPromise is tricky because not handling response or error/status code, just body
    var body = JSON.parse(body);
    var duration = body.rows[0].elements[0].duration;
    var value = 0;

    // Might be a bug in here still if origin & destination are the same.
    if (duration) {
      value = duration.value;
    }

    return value;
  })
  .then(value => Travel.initiateTravel(event, (value * 1000))) // convert milliseconds to seconds
  .spread((travel, created) => travel);
};

module.exports = addTravel;
