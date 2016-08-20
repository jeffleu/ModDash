const TravelController = require('../db/controllers').TravelController;
const UserController = require('../db/controllers').UserController;
// const { TravelController, UserController } = require('../db/controllers');
const requestPromise = require('request-promise');
const googleMap = require('./map/googleMap');

const addTravel = (event) => {
  // console.log('=========================== [addTravel]: event.dataValues\n', event.dataValues);
  return UserController.getUserInfo(event.dataValues.userId)
  .then((data) => {
      // console.log('========================= [addTravel]: options\n', options);
    // Request to Google Maps API for travel data
    return requestPromise(googleMap.mapTravel(data, event));
  })
  .then(body => {
    // requestPromise is tricky because not handling response or error/status code, just body
    var body = JSON.parse(body);

    // console.log('========================= [addTravel]: body', body);
    var duration = body.rows[0].elements[0].duration;
    var value = 0;

    // Might be a bug in here still if origin & destination are the same.
    if (duration) {
      value = duration.value;
    }

    return value;
  })
  .then(value => TravelController.initiateTravel(event, (value * 1000))) // convert milliseconds to seconds
  .spread((travel, created) => travel);
};

module.exports = addTravel;
