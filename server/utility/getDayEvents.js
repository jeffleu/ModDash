const Event = require('../db/queries').Event;

const getDayEvents = (req, res) => {
  // console.log('in get day events', req.session);
  // req.session.regenerate(() => {
    // req.session.something = 'something';
    // console.log('after regenerating', req.session);  
  Event.retrieveDayEvent(req.userId)
  .then(datas => {
    res.send(datas);
  });
  // })
};

module.exports = getDayEvents;

