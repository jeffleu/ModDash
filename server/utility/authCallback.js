const User = require('../db/queries').User;
const googleOAuth = require('../setup/googleOAuth');

const authCallback = (req, res) => {
  googleOAuth.googleCalAuthCallback(req.query.code)
  .then((user) => {
    User.findOrCreateUser(user.profile, user.tokens)
    .spread((user, created) => {
      if (created) { // this is for new users
      // NOTE: REDIRECT THEM TO SPLASH PAGE HERE. 
        res.redirect('/')
      } else {
      // Could redirect them to same splash page
        res.redirect('/')
      }
    })
  })
  .catch(err => {
    console.warn('Did not find user\'s profile in db for web oAuth', err);
  });
};

module.exports = authCallback;