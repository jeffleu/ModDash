const UserController = require('../db/controllers').UserController;
// const { UserController } = require('../db/controllers');
const googleOAuth = require('./../setup/googleOAuth');
const jwt = require('jsonwebtoken');
const uuid = require('node-uuid');

const extensionAuth = function(req, res) {
  // do oAuth with the token that comes back from google
  googleOAuth.extensionIdentityAuth(req.body.token)
  .then(profile => {
    console.log(`user ${profile.displayName} is doing extension auth`);
    // auth the user by checking their googleId against our user table's googleID
    UserController.authUser(profile)
    .then(user => {
      if (user) {
        // put into pubnub module
        var pubnubid = user.dataValues.pubnubid
        if (!pubnubid) {
          pubnubid = uuid.v4();
          UserController.updatePubnub(user.dataValues.id, pubnubid);
        }
        // put into jwt token module
        var tokenOptions = {
          issuer: 'NeverMissOut'
        }
        var token = jwt.sign({userId: user.dataValues.id}, process.env.JWT_SECRET, tokenOptions);
        // jwt.sign(payload, secretOrPrivateKey, options, [callback])
        res.json({
          success: true,
          message: 'here is your token',
          token: token,
          channel: pubnubid
        });
      }
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
