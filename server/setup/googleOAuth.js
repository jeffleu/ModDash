const UserController = require('../db/controllers').UserController;
const google = require('googleapis');
const plus = google.plus('v1');
const Promise = require('bluebird');
plus.people.get = Promise.promisify(plus.people.get);
var OAuth2 = google.auth.OAuth2;


var oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, 
  process.env.GOOGLE_CLIENT_SECRET, 
  'http://localhost:9000/verified');

oauth2Client.getToken = Promise.promisify(oauth2Client.getToken);
oauth2Client.refreshAccessToken = Promise.promisify(oauth2Client.refreshAccessToken);

// generate consent page url with our required access scopes
var url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read', 'https://www.googleapis.com/auth/calendar'] 
});

const googleCalAuthCallback = (code) => {
  // not sure how to fix this promise chain because I need to return tokens and profile for the next function. 
  // plus.people.get can only return profile and may not be able return both tokens and profile at the same time until people.get promise returns
  return oauth2Client.getToken(code)
  .then(tokens => {
    oauth2Client.setCredentials(tokens);
    return plus.people.get({ userId: 'me', auth: oauth2Client })
    .then(profile => {
      var user = {
        tokens: tokens,
        profile: profile
      }
      return user;
    });
  })
  .catch(err => {
    console.warn('error in getting web oAuth token', err);  
  });
};

const extensionIdentityAuth = (token) => {
  oauth2Client.setCredentials({
    access_token: token  
  });
  return plus.people.get({ userId: 'me', auth: oauth2Client })
};

const getUserTokens = function(id) {
  return UserController.getUser(id)
  .then(user => {
    oauth2Client.setCredentials({
      refresh_token: user.dataValues.refreshToken
    });
    return oauth2Client.refreshAccessToken()
  })
  .then(tokens => {
    oauth2Client.setCredentials({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token
    });
    return oauth2Client; 
  })
  .catch(err => {
    console.warn('error in getting refresh/access token', err);
  });
};

module.exports = {
  oauth2Client,
  url,
  googleCalAuthCallback,
  extensionIdentityAuth,
  getUserTokens
};