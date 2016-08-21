const User = require('../../db/queries').User;
const requestPromise = require('request-promise');
const googleMap = require('./googleMap');

const getTrafficTime = (event) => {
  return User.getUserInfo(event.dataValues.userId)
  .then(data => requestPromise(googleMap.mapTraffic(data, event)))
  .then(body => {
    body = JSON.parse(body);

    var duration = body.rows[0].elements[0].duration;
    var traffic = 0;
    if (duration) {
      traffic = duration.value * 1000; // convert seconds to milliseconds
    }
    var notificationTime = new Date(Date.parse(event.startdatetime) - (traffic + 300000));

    return {
      traffic,
      notificationTime
    };
  });
};

module.exports = getTrafficTime;