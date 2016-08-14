const path = require('path');
const router = require('express').Router();
const User = require('./db/controllers/userController.js');
const InsertEvent = require('./db/controllers/eventApi.js');
const CalendarEvents = require('./db/controllers/eventController.js');
const GoogleAuthUrl = require('./setup/googleOAuth').url;
const GoogleMaps = require('./utility/googleMaps');
const getAllEventsFromCalendar = require('./utility/getAllEventsFromCalendar');



router.get('/auth', function(req, res) {
  res.redirect(GoogleAuthUrl);
});

router.get('/authCallback', User.createUser);

router.post('/calendar/addEvent', InsertEvent.postEventToApi);
router.get('/calendar/getEvent', CalendarEvents.retrieveDayEvent);
router.get('/calendar/getAllEvents', getAllEventsFromCalendar);

module.exports = router;
