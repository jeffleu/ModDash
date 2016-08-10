const models = require('../models/models');
const User = models.User;
const googleOAuth = require('./../../setup/googleOAuth');
const google = require('googleapis');
const plus = google.plus('v1');

var oauth2Client = googleOAuth.oauth2Client;


const createUser = function(req, res) {
  const code = req.query.code;
  // console.log(code);
  oauth2Client.getToken(code, function (err, tokens) {
    if (err) {
      console.warn('error in getting Token', err);
    }

    // console.log(tokens);

    oauth2Client.setCredentials(tokens);

    // console.dir('oauth2Client', oauth2Client);

    plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
      if (err) {
        return console.log('An error occured', err);
      }
      // console.log(profile);
      // BUG: this does not return email
      User.create({
        lastName: profile.name.familyName,
        firstName: profile.name.givenName,
        refreshToken: tokens.refresh_token,
        accessToken: tokens.access_token
      })
    });
  });
  res.send('Thank you for authorization!');
};

const getUserTokens = function(id){
  return User.findOne({
    where: { id: id }
  })
}

module.exports = {
  createUser,
  getUserTokens
};
