const googleOAuth = require('./../../setup/googleOAuth.js');
const google = require('googleapis');
const calendar = google.calendar('v3');
const plus = google.plus('v1');

var oauth2Client = googleOAuth.oauth2Client;

const postEventToApi = function(req, res) {
  console.log('body', req.body.summary);

  const params = {calendarId: 'primary', auth: oauth2Client, resource: req.body}
  oauth2Client.setCredentials()
  calendar.acl.insert(params, function(err, data) {
    if(err) {
      console.log('did not insert to cal', err);
    } else {
      console.log('data', data);
    }
  })
}

module.exports = {
  postEventToApi
};
