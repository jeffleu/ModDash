// request 
// createOrFindUser = require(usercontroller).createorFindUser
const UserController = require('./../db/controllers/userController.js');
const googleOAuth = require('./../setup/googleOAuth');
const google = require('googleapis');
const plus = google.plus('v1');

var oauth2Client = googleOAuth.oauth2Client;

const authCallback = function(req, res) {
  // do oAuth with the code that comes back from google
  var code = req.query.code;

  oauth2Client.getToken(code, function (err, tokens) {
    if (err) {
      console.warn('error in getting Token', err);
    }
    oauth2Client.setCredentials(tokens);

    // after getting tokens, do a call to googlePlus API for user details, get their googleID

  });

    // // promisify this probably, see addEvent for example
    // plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
    //   if (err) {
    //     return console.log('An error occured', err);
    //   }
    //   console.log('new user signing in with profile:', profile);

    //.then(profile) {
    //   UserController.findOrCreateUser(profile, tokens); // user is either found (i.e. verified, or they are created)
    //   .spread(user, created) {
    //     // give them a session
    //     // req.session to validate with googleID and maybe the pubnub identification ID as well
      // }
    //   // how to get access to tokens in this callback/promise?
}

  // TO DO: Probably serve up static splash page.
  // res.send('Thank you for authorization!');
module.exports = authCallback;


// profile = 
// { kind: 'plus#person',
//   etag: '"xw0en60W6-NurXn4VBU-CMjSPEw/63FtqRNt9nXs8OAYSaZnIOQfqFk"',
//   gender: 'male',
//   emails: [ { value: 'xazndynastyx@gmail.com', type: 'account' } ],
//   objectType: 'person',
//   id: '107567836317902297979',
//   displayName: 'aZn DyNasTy',
//   name: { familyName: 'DyNasTy', givenName: 'aZn' },
//   url: 'https://plus.google.com/107567836317902297979',
//   image:
//    { url: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50',
//      isDefault: true },
//   isPlusUser: true,
//   language: 'en',
//   ageRange: { min: 21 },
//   circledByCount: 0,
//   verified: false }
