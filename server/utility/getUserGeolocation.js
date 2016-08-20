const User = require('../db/queries').User;

const getUserGeolocation = (req, res) => {
  return User.getUserInfo(req.userId)
    .then((data) => { res.send(data.dataValues); })
    .catch((err) => { res.sendStatus(404); });
};

module.exports = getUserGeolocation;