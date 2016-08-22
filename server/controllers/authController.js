const User = require('../db/queries').User;
const googleAuth = require('../utility/auth/googleAuth');
const jwt = require('jsonwebtoken');
const uuid = require('node-uuid');

const authHandler = (req, res) => {
  // do oAuth with the token that comes back from google
  googleAuth.extensionIdentityAuth(req.body.token)
  .then(profile => {
    console.log(`user ${profile.displayName} is doing auth`);
    // auth the user by checking their googleId against our user table's googleID
    User.authUser(profile)
    .then(user => {
      // if user is not found, send back the googleCal web auth url
      if (!user) {
        res.json({
          message: 'please sign up with googleCal', 
          url: googleAuth.url
        }); 
      };
      // if user is found, log them in and give them a token and channel
      if (user) {
        // put this into pubnub module
        var pubnubid = user.dataValues.pubnubid;
        
        if (!pubnubid) {
          pubnubid = uuid.v4();
          User.updatePubnub(user.dataValues.id, pubnubid);
        }
        
        var tokenOptions = { issuer: 'NeverMissOut' };

        var token = jwt.sign({userId: user.dataValues.id}, process.env.JWT_SECRET, tokenOptions);
        
        res.json({
          success: true,
          message: 'here is your token',
          token,
          channel: pubnubid
        });
      };
    })
  })
  .catch(err => {
    console.log('did not get users profile', err);
    res.json({
      success: false,
      message: 'please log in again'
    })
  });
};

const authCallback = (req, res) => {
  googleAuth.googleCalAuthCallback(req.query.code)
  .then((user) => {
    User.findOrCreateUser(user.profile, user.tokens)
    .spread((user, created) => {
      if (created) { // this is for new users
      // NOTE: REDIRECT THEM TO SPLASH PAGE HERE. 
        // res.redirect('/')
      res.send('splash page');
      } else {
      // Could redirect them to same splash page
        // res.redirect('/')
      res.send('splash page');
      }
    })
  })
  .catch(err => {
    console.warn('Did not find user\'s profile in db for web oAuth', err);
  });
};

// const authHandler = (req, res) => {

// }

module.exports = {
  // extensionAuth,
  authCallback,
  authHandler
};