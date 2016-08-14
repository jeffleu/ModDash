const agenda = require('./agenda');
const getTrafficTime = require('./../utility/getTrafficTime');
const sendLeaveNotification = require ('./sendLeaveNotification');
const EventController = require('./../db/controllers/eventController');


// define the job
agenda.define('query traffic', function(job, done) {
  // this should probably be a setInterval to keep querying for Traffic time and then setting new notification job if it meets certain requirements. Interval ends when we pass the leave time. 
  // for now we are just going to query traffic once at the scheduled time, which is double the initial estimate
  var travel = job.attrs.data;
  var eventId = travel.eventId;
  EventController.retrieveEvent(eventId)
  .then(event => {
    return getTrafficTime(event)
    .then(notificationTime => {
      sendLeaveNotification(notificationTime, event.dataValues);
      // schedule notification for leaving
    });
  })  
  // then agenda.cancel({id: jobiD}) or some other kind of identifier of the job we were doing
  done();
});


// function for scheduling the job
const queryTraffic = function (travel) {
  travel = travel.dataValues;
  console.log('scheduling a queryTraffic worker for destination', travel.destination,'to begin querying at', travel.queryTime)
  agenda.schedule(travel.queryTime, 'query traffic', travel);  
}

module.exports = queryTraffic;