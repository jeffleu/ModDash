const path = require('path');
const router = require('express').Router();
const User = require('./db/controllers/userController.js');
const Event = require('./db/controllers/eventController.js');
const Calendar = require('./db/controllers/calendarController.js');
const InsertEvent = require('./db/controllers/eventApi.js');

const GoogleAuthUrl = require('./setup/googleOAuth').url;
require('dotenv').config();


router.get('/auth', function(req, res) {
  res.redirect(GoogleAuthUrl);
});

router.get('/authCallback', User.createUser);

router.post('/calendar/addEvent', InsertEvent.postEventToApi);
router.get('/calendar', Calendar.getAll);


module.exports = router;
