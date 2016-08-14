const agenda = require('./agenda');
const googleMaps = require('./../utility/googleMaps.js');
const sendLeaveNotification = require ('./sendLeaveNotification');

// define the job
agenda.define('query maps for traffic', function(job, done) {
  // eventId = jobs.attrs.data
  googleMaps.getTrafficTime(eventId);
  //.then((data) => {

    // compare against initial estimate time and then if it's more, then change notification time, cancel old one?
     // agenda.schedule(travel.dataValues.notificationTime, 'send notification', data);
     // be careful about what data this is, it might be the travel data, not event data. 
     // this is probably a good reason for combining the event + travel tables together? or would a joined query have been enough to keep track of data? or could query data again here in this job. 

  // this is probably a setInterval to keep querying for Traffic time and then setting new notifcation job if it meets certain requirements. Interval ends when we pass the leave time. 

  // then agenda.cancel({id: jobiD}) or some other kind of identifier of the job we were doing
  sendLeaveNotification() //notification time, eventData



  done();
});

// function for scheduling the job
const queryTraffic = function (queryTime, travelData) {
  agenda.schedule(queryTime, 'query traffic', travelData)  
}

module.exports = queryTraffic;