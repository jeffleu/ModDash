const path = require('path');
const router = require('express').Router();
const User = require('./db/controllers/userController.js');
const Calendar = require('./db/controllers/calendarController.js');

const GoogleAuthUrl = require('./setup/googleOAuth').url;
require('dotenv').config();


router.get('/auth', function(req, res) {
  res.redirect(GoogleAuthUrl);
});

router.get('/authCallback', User.createUser);

router.get('/calendar', Calendar.getAll);

// router.post('/calendar', Calendar.createEvent); 

module.exports = router;
