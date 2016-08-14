const agenda = require('./agenda');
const getTrafficTime = require('./../utility/getTrafficTime');
const sendLeaveNotification = require ('./sendLeaveNotification');
const EventController = require('./../db/controllers/eventController');


// define the job
agenda.define('query traffic', function(job, done) {
  var eventId = jobs.attrs.data;
  EventController.retrieveEvent(eventId)
  .then(event => {
    // this is probably a setInterval to keep querying for Traffic time and then setting new notification job if it meets certain requirements. Interval ends when we pass the leave time. 
    return getTrafficTime(event)
    .then(trafficTime => {
    // if (trafficTime <=) // don't know what value this should be yet; 
    // schedule notification for leaving
      sendLeaveNotification(trafficTime, event); //notification time, eventData
    });
  })
  // compare against initial estimate time and then if it's more, then change notification time, cancel old one?
  
  // then agenda.cancel({id: jobiD}) or some other kind of identifier of the job we were doing
  done();
});


// function for scheduling the job
const queryTraffic = function (travel) {
  agenda.schedule(travel.dataValues.queryTime, 'query traffic', travel.dataValues)  
}

module.exports = queryTraffic;