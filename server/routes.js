const path = require('path');
const router = require('express').Router();
const User = require('./db/controllers/userController.js');
const addEvent = require('./utility/addEvent');
const CalendarEvents = require('./db/controllers/eventController.js');
const GoogleAuthUrl = require('./setup/googleOAuth').url;
const GoogleMaps = require('./utility/googleMaps');
const getAllEventsFromCalendar = require('./utility/getAllEventsFromCalendar');



router.get('/auth', function(req, res) {
  res.redirect(GoogleAuthUrl);
});

router.get('/authCallback', User.createUser);
// this is tricky to fix, probably want to serve up a static page

router.post('/calendar/addEvent', addEvent);
router.get('/calendar/getEvent', CalendarEvents.retrieveDayEvent);
router.get('/calendar/getAllEvents', getAllEventsFromCalendar);

module.exports = router;
