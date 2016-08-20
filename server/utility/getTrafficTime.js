const UserController = require('../db/controllers').UserController;
// const { UserController } = require('./../db/controllers');
const requestPromise = require('request-promise');
const googleMap = require('./map/googleMap');

const getTrafficTime = function(event) {

  // console.log('======================= []: event', event.dataValues);

  return UserController.getGeolocation(event.dataValues.userId)
  .then((data) => {
    return requestPromise(googleMap.mapTraffic(data, event))
  })
  .then(body => {
    body = JSON.parse(body);

    var duration = body.rows[0].elements[0].duration;
    var traffic = 0;
    if (duration) {
      traffic = duration.value * 1000; // convert seconds to milliseconds
    }
    var notificationTime = new Date(Date.parse(event.startdatetime) - (traffic + 300000));

    console.log('Traffic (in seconds):\n', traffic);
    console.log('Notification Time:\n', notificationTime);

    return {
      traffic,
      notificationTime
    };
  });
};

module.exports = getTrafficTime;
