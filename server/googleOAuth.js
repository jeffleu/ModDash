const google = require('googleapis');
const readline = require('readline');
const calendar = google.calendar('v3');
const plus = google.plus('v1');


require('dotenv').config();
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, 
  process.env.GOOGLE_CLIENT_SECRET, 
  'http://localhost:9000/hi')

function getAccessToken (oauth2Client, callback) {
  // generate consent page url
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/calendar'] // can be a space-delimited string or an array of scopes
  });

  console.log(url);

  rl.question('Enter the code here:', function (code) {
    // request access token
    oauth2Client.getToken(code, function (err, tokens) {
      if (err) {
        return callback(err);
      }
      // set tokens to the client
      // TODO: tokens should be set by OAuth2 client.
      oauth2Client.setCredentials(tokens);
      callback();
      
      
    });
  });
};

getAccessToken(oauth2Client, function () {
  // retrieve user profile
  calendar.calendarList.list({auth: oauth2Client}, function(err, data) {
        if (err) {
          console.log(err);
        }
        console.log(data);
      });
  plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
    if (err) {
      return console.log('An error occured', err);
    }
      console.log(profile);
  });
});