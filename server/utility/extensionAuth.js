const User = require('../db/queries').User;
const googleOAuth = require('./../setup/googleOAuth');
const jwt = require('jsonwebtoken');
const uuid = require('node-uuid');

const extensionAuth = (req, res) => {
  // do oAuth with the token that comes back from google
  googleOAuth.extensionIdentityAuth(req.body.token)
  .then(profile => {
    console.log(`user ${profile.displayName} is doing extension auth`);
    // auth the user by checking their googleId against our user table's googleID
    User.authUser(profile)
    .then(user => {
      if (user) {
        // put into pubnub module
        var pubnubid = user.dataValues.pubnubid
        
        if (!pubnubid) {
          pubnubid = uuid.v4();
          User.updatePubnub(user.dataValues.id, pubnubid);
        }
        
        // put into jwt token module
        var tokenOptions = { issuer: 'NeverMissOut' };

        // jwt.sign(payload, secretOrPrivateKey, options, [callback])
        var token = jwt.sign({userId: user.dataValues.id}, process.env.JWT_SECRET, tokenOptions);
        
        res.json({
          success: true,
          message: 'here is your token',
          token,
          channel: pubnubid
        });
      }
      // if no user after they tried to log in with chrome.identity, 
      // we res.redirect to our sign up auth that gives us calendar privileges,
      // then that redirects them to our splash page telling them thank you for signing up and telling them of future features like twilio
      // also some info about us, the creators
      // then the window closes or we tell them to close the window
      // now they are in our user table, we ask them to log in again after signing up
      // seems reasonable, kinda shitty to make them sign up and then have to log in again but no way around it
    });
  })
  .catch(err => {
    console.log('did not get users profile', err);
    res.json({
      success: false,
      message: 'please log in again'
    })
  })
};

module.exports = extensionAuth;
