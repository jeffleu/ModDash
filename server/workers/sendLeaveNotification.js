const agenda = require('./agenda');
const pubnub = require('./../setup/pubnub');
const origin = '944 Market St San Francisco, CA 94102';

agenda.define('send leave notification', function(job, done) {
  // use pubnub to send notification
  job.attrs.data.origin = origin;
  var event = job.attrs.data;

  // console.log('am i getting map direction data', mapData);
  pubnub.publish({
    message: event,
    channel: 'timeToLeave',
    sendByPost: false, // true to send via post
    storeInHistory: false //override default storage options
    // meta: { "cool": "meta" } // publish extra meta with the request
    }, function (status, response) {
      // handle status, response
      console.log('map notification was created')
    }
  );

  // after sending notification, agenda.cancel
  // agenda.cancel({"_id": job._id}, function(err, jobs) {
  //   console.log('canceled job after notification was sent', jobs);
  // })

  console.log('sending notification to user to leave now for event:', event.name);

  done();
});

const sendLeaveNotification = function(notificationTime, eventData) {
  console.log('scheduling a leave notification for event', eventData.name, 'at',  notificationTime)
  // pubnub publish
  agenda.schedule(notificationTime, 'send leave notification', eventData);
}

module.exports = sendLeaveNotification;
