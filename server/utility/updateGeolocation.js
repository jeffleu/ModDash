const User = require('../db/queries').User;

const updateGeolocation = (req, res) => {
  return User.updateUserGeolocation(req.userId, req.body.geolocation)
    .then((result) => { res.sendStatus(200); })
    .catch((err) => { res.sendStatus(404); });
};

module.exports = updateGeolocation;