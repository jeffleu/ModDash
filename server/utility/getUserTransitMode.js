const User = require('../db/queries').User;

const getUserTransitMode = (req, res) => {
  return User.getUserTransitMode(req.userId)
    .then((data) => { console.log('huh', data) })
    .catch((err) => { res.sendStatus(404); });
};

module.exports = getUserTransitMode;