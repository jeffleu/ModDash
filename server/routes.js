const path = require('path');
const router = require('express').Router();
const User = require('./db/controllers/userController.js');
const Event = require('./db/controllers/eventController.js');
const GoogleAuthUrl = require('./setup/googleOAuth').url;
require('dotenv').config();


router.get('/auth', function(req, res) {
  res.redirect(GoogleAuthUrl);
});

router.get('/authCallback', User.createUser);

router.post('/calendar/addEvent', Event.postEventToApi);

module.exports = router;
