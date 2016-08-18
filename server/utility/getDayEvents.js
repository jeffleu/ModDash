const EventController = require('./../db/controllers/eventController');


const getDayEvents = (req, res) => {
  // console.log('in get day events', req.session);
  // req.session.regenerate(() => {
    // req.session.something = 'something';
    // console.log('after regenerating', req.session);  
    EventController.retrieveDayEvent()
    .then(datas => {
      res.send(datas);
    });
  // })
}

module.exports = getDayEvents;

