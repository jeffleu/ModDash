const User = require('../db/queries').User;

const getGeolocation = (req, res) => {
  return User.getUserInfo(req.userId)
    .then((data) => { res.send(data.dataValues); })
    .catch((err) => { res.sendStatus(404); });
};

const updateGeolocation = (req, res) => {
  return User.updateUserGeolocation(req.userId, req.body.geolocation)
    .then((result) => { res.sendStatus(200); })
    .catch((err) => { res.sendStatus(404); });
};

const getTransitMode = (req, res) => {
  return User.getUserInfo(req.userId)
    .then((data) => { res.send(data.dataValues); })
    .catch((err) => { res.sendStatus(404); });
};

const updateSettings = (req, res) => {
  return User.updateUserSettings(req.userId, req.body.transit, req.body.phoneNumber)
    .then((result) => { res.sendStatus(200); })
    .catch((err) => { res.sendStatus(404); });
};

module.exports = {
  getGeolocation,
  updateGeolocation,
  getTransitMode,
  updateSettings
};