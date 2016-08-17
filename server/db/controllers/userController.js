const models = require('../models/models');
const User = models.User;
const googleOAuth = require('./../../setup/googleOAuth');
const google = require('googleapis');
const plus = google.plus('v1');

var oauth2Client = googleOAuth.oauth2Client;

// this should be refactored into just User.create; the getToken and plus.people.get should be refactored into a utility function
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
  // TO DO: probaby serve up static page here instead
  res.send('Thank you for authorization!');
};

const getUserTokens = function(id){
  return User.findOne({
    where: { id: id }
  })
  .then(data => {
    oauth2Client.setCredentials({
      refresh_token: "AJilOCP9PWwuhSAzsZDci3nbZU2faYarOxm0UV2oAsxAch9UzARoRB8BTV5rsCiLftZIXTVt8iuDCX-0I4vKFwA58uW9v3VhcwRQfHte31hiYIJpCD_35PiG5bZ_3AvxMGqcNNM3xV89Jqd2X-Urbsowo85SX096VB7CW1dpFitC-F1ScYrmRyPj7T-YzvzaB4txXiqtj4WcnPVeN6DDZNMUdNKM9WeoNn0LrYGKhkgwgXWCaE98Ny-ihSoSP6FTXv62DcDHZnCdvFRvHP-MScqkdxtWRehhlyofH1TXyYht9g9qtuvAYrfTmrTYfjRLN7i0LDUnnUNzQAAn4lygHPW4XrTkO1rdI6_NcjOq5guOFCZ9hvydgtSWN4bDDwsYl5c8qy8fOW0m"
    });
    oauth2Client.refreshAccessToken((err, tokens) => {
      console.log('token', tokens);
      // oauth2Client.setCredentials({
      //   access_token: tokens.access_token,
      //   refresh_token: tokens.refresh_token
      // });
    });
  });
}

module.exports = {
  createUser,
  getUserTokens
};
