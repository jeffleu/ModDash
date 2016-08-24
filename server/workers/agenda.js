const Agenda = require('agenda'); 

const mongoConnectionString = process.env.MONGODB_URI;

var agenda = new Agenda({db: {address: mongoConnectionString, collection: 'mapJobs', options: {server:{auto_reconnect:true}}}});

agenda.on('ready', function() {
  // getTravels();
  console.log('Agenda is connected to Heroku mongodb.');
  agenda.start();
});

agenda.on('error', function(err) {
  console.warn('Error in Agenda connecting to Heroku mongodb:\n', err);
});

agenda.on('fail', function(err, job) {
  console.log("Job failed with error: %s", err.message);
});

agenda.on('success', function(job) {
  console.log('Successfully completed job:', job.attrs);
})

module.exports = agenda;