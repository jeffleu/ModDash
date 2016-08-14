const agenda = require('./agenda');
const pubnub = require('./../setup/pubnub');


agenda.define('send leave notification', function(job, done) {
  // use pubnub to send notification
  var event = job.attrs.data;

  pubnub.publish({
    message: JSON.stringify(event), // third argument for schedule is data that is passed in as jobs.attrs.data
    channel: 'timeToLeave',
    sendByPost: false, // true to send via post
    storeInHistory: false //override default storage options
    // meta: { "cool": "meta" } // publish extra meta with the request
    }, function (status, response) {
      // handle status, response
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
  agenda.schedule(notificationTime, 'send leave notification', eventData);
}

module.exports = sendLeaveNotification;