const requestPromise = require('request-promise');

const url = 'https://maps.googleapis.com/maps/api/distancematrix/json';
const origins = 'Hack Reactor, 944 Market St, San Francisco, CA 94102';

const getTrafficTime = function(event) {
  var glink = event;
  console.log('gmap api', glink);
  var startTime = event.dataValues.startdatetime
  var options = {
    url,
    qs: {
      key: process.env.GOOGLE_MAPS_API_KEY,
      origins: origins,
      // origins needs to be changed to the user's current location or previous location
      destinations: event.dataValues.location,
      // can probably store destinations in job?
      mode: 'driving',
      departure_time: 'now',
      units: 'imperial',
      traffic_model: 'best_guess'
    }
  };
  return requestPromise(options)
  .then(body => {
    body = JSON.parse(body);
    // console.log(body.rows[0].elements[0]);
    // var distance = body.rows[0].elements[0].distance;
    var duration = body.rows[0].elements[0].duration;
    var traffic = duration.value * 1000; // convert seconds to milliseconds
    console.log('got the traffic time in seconds:', traffic / 1000);
    var notificationTime = new Date(Date.parse(event.startdatetime) - (traffic + 300000));
    return {
      traffic,
      notificationTime
    };
  });
};

module.exports = getTrafficTime;
