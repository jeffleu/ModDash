const Event = require('../db/queries').Event;
const agenda = require('./agenda');
const getTrafficTime = require('../utility/map/getTrafficTime');
const sendLeaveNotification = require ('./sendLeaveNotification');

const recurringCheck = (event) => {
  console.log('inside recurringCheck');  
  const timeToCheckAgain = 180000; // 3 min
  getTrafficTime(event)
  .then(times => {
    if (Date.now() + times.traffic + 300000 >= Date.parse(event.dataValues.startdatetime)) {
      console.log('traffic is over start time, sending notification'); 
      event.dataValues.traffic = times.traffic;
      sendLeaveNotification(times.notificationTime, event.dataValues);
    } else {
      console.log('traffic is not over start time, do setTimeout to make another check in 3 minutes');
      // polling is a time-sensitive way to query data 
      setTimeout(function() {
        console.log('setTimeout recurringCheck triggered 3 minute later');
        recurringCheck(event);
      }, timeToCheckAgain);
    }
  });
};

// define the job
agenda.define('query traffic', (job, done) => {
  var travel = job.attrs.data;
  var eventId = travel.eventId;

  return Event.retrieveEvent(eventId)
  .then(event => {
    recurringCheck(event);
  });
    
  // then agenda.cancel({id: jobiD}) or some other kind of identifier of the job we were doing
  done();
});

// function for scheduling the job
const queryTraffic = travel => {
  travel = travel.dataValues;
  console.log('scheduling a queryTraffic worker for destination', travel.destination,'to begin querying at', travel.queryTime)
  agenda.schedule(travel.queryTime, 'query traffic', travel);
};

module.exports = queryTraffic;