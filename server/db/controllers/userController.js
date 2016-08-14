const models = require('../models/models');
const User = models.User;
const googleOAuth = require('./../../setup/googleOAuth');
const google = require('googleapis');
const plus = google.plus('v1');

var oauth2Client = googleOAuth.oauth2Client;


const createUser = function(req, res) {
  const code = req.query.code;
  oauth2Client.getToken(code, function (err, tokens) {
    if (err) {
      console.warn('error in getting Token', err);
    }
    oauth2Client.setCredentials(tokens);
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
  .then(data => {
    oauth2Client.setCredentials({
      refresh_token: data.dataValues.refreshToken
    });
    oauth2Client.refreshAccessToken((err, tokens) => {
      oauth2Client.setCredentials({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token
      });
    });
  });
}

module.exports = {
  createUser,
  getUserTokens
};
