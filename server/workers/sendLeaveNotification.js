const UserController = require('../db/controllers').UserController;
// const { UserController } = require('../db/controllers');
const agenda = require('./agenda');
const pubnub = require('./../setup/pubnub');
const newTwilioMessage = require('../utility/notification/twilio');

agenda.define('send leave notification', function(job, done) {
  // Keep an eye on this, there may be a bug where multiple notifications are sent 
  return UserController.getUser(job.attrs.data.userId)
  .then((user) => {
    job.attrs.data.origin = user.dataValues.geolocation;

    var channel = user.dataValues.pubnubid;
    var message = job.attrs.data;
    // Send notification through Pubnub
    pubnub.publishTimeToLeave(channel, message);

    // after sending notification, agenda.cancel
    // agenda.cancel({"_id": job._id}, function(err, jobs) {
    //   console.log('canceled job after notification was sent', jobs);
    // })

    // Send text message via Twilio
    // TO DO: Phone number should NOT be hard coded.
    newTwilioMessage('14158124699', event.name, event.traffic, event.location);

    console.log('Sending notification to user to leave now for event:', message.name);

    done();
  });
});

const sendLeaveNotification = (notificationTime, eventData) => {
  console.log('Scheduling a leave notification for event ', eventData.name, ' at ',  notificationTime);
  // pubnub publish
  agenda.schedule(notificationTime, 'send leave notification', eventData);
};

module.exports = sendLeaveNotification;