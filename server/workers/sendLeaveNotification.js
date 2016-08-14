const agenda = require('./agenda');
const pubnub = require('./../pubnub');


agenda.define('send leave notification', function(job, done) {
  // use pubnub to send notification
  pubnub.publish({
    message: job.attrs.data, // third argument for schedule is data that is passed in as jobs.attrs.data
    channel: 'timeToLeave',
    sendByPost: false, // true to send via post
    storeInHistory: false //override default storage options
    // meta: { "cool": "meta" } // publish extra meta with the request
    }, function (status, response) {
      // handle status, response
    }
  ); 

  // after sending notification, agenda.cancel
  var travelId = job.attrs.data.data.id;

  console.log('sending notification to user to leave now for event:', job.attrs.data);

  agenda.cancel({"_id": job._id}, function(err, jobs) {
    console.log('canceled job after notification was sent', jobs); 
  })
  done();
});

const sendLeaveNotification = function(notificationTime, eventData) {
  agenda.schedule(notificationTime, 'send leave notification', eventData);
}

module.exports = sendLeaveNotification;