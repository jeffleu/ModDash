const UserController = require('./../db/controllers/userController');

const updateGeolocation = (req, res) => {
  return UserController.updateUserGeolocation(req.userId, req.body.geolocation)
    .then((result) => { res.sendStatus(200); })
    .catch((err) => { res.sendStatus(404); });
};

module.exports = updateGeolocation;