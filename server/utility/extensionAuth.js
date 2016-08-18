const UserController = require('./../db/controllers/userController.js');
const googleOAuth = require('./../setup/googleOAuth');
const google = require('googleapis');
const plus = google.plus('v1');
const Promise = require('bluebird');
plus.people.get = Promise.promisify(plus.people.get);
var oauth2Client = googleOAuth.oauth2Client;

const extensionAuth = function(req, res) {
  // do oAuth with the code that comes back from google
  var token = req.body.token;
  // console.log(token); 
  oauth2Client.setCredentials(
    {access_token: token});
    // after getting tokens, do a call to googlePlus API for user details, get their googleID
  plus.people.get({ userId: 'me', auth: oauth2Client })
  .then(profile => {
    // auth the user by checking their googleId against our user table's googleID
    console.log(profile);
    UserController.authUser(profile)
    .then(user => {
      console.log('current session\n', req.session);
      // console.log(user); 
      return req.session.regenerate(() => {
        req.session.googleid = user.dataValues.googleid;
        req.session.userId = user.dataValues.id;
        console.log('new session\n', req.session)
      });
    });
  })
  .catch(err => {
    console.log('did not get users profile', err);
  })
}
module.exports = extensionAuth;
