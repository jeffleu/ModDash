const TravelController = require('./../db/controllers/travelController');
const requestPromise = require('request-promise');
const queryTraffic = require('./../workers/queryTraffic');


const origins = 'Hack Reactor, 944 Market St, San Francisco, CA 94102';
const url = 'https://maps.googleapis.com/maps/api/distancematrix/json';


const addTravel = function(event) {
  console.log('inside addTravel', event)
  var options = {
    url,
    qs: {
      key: process.env.GOOGLE_MAPS_API_KEY,
      origins: origins,
      destinations: event.dataValues.location,
      mode: 'driving',
      arrival_time: event.dataValues.startdatetime,
      // departure_time: 'now',
      units: 'imperial'
      // traffic_model: 'best_guess'
    }
  };

  // request to google maps api for travel data
  return requestPromise(options)
  .then(body => {
    // requestPromise is tricky because not handling response or error/status code, just body
    var body = JSON.parse(body);
    // console.log(body.rows[0].elements[0]);
    // var distance = body.rows[0].elements[0].distance;
    var duration = body.rows[0].elements[0].duration;
    var value = duration.value || 0
    return value;
  })
  .then(value => {
    // add data to Travel table, see /db/controllers/travelController
    return TravelController.initiateTravel(event, (value * 1000)); // convert seconds to milliseconds
  })
  .spread((travel, created) => {
    console.log('travel was created:', created);
      // schedule job to query traffic, see workers/queryTraffic.js
    queryTraffic(travel.dataValues.queryTime, travel.dataValues);
  });
};

module.exports = addTravel; 