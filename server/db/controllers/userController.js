const models = require('../models/models');
const User = models.User;


// this should be refactored into findOrCreateUser (see eventController for the example of how to use findOrCreate). the (req, res) and oAuth should all be handled in the authCallback. 

const findOrCreateUser = function(profile, tokens) {
  return User.findOrCreate({
    where: {
      googleId: profile.id},
    defaults: {
    lastName: profile.name.familyName,
    firstName: profile.name.givenName,
    email: profile.emails[0].value,
    refreshToken: tokens.refresh_token,
    accessToken: tokens.access_token
    }
  });
};

const getUserTokens = function(id) {
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
};

const getGeolocation = (id) => {
  return User.findOne(
    { attributes: ['geolocation']},
    { where: {id: id} }
  );
};

const updateUserGeolocation = (id, geolocation) => {
  return User.update(
    { geolocation: geolocation },
    { where: {id : id} })  
      .then((result) => result)
      .catch((err) => err);
};

module.exports = {
  findOrCreateUser,
  getUserTokens,
  getGeolocation,
  updateUserGeolocation
};