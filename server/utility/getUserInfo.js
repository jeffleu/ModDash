const UserController = require('./../db/controllers/userController');

const getUserInfo = (req, res) => {
  // TO DO: User ID hardcoded for now, but should not be. The id should be in the request.
  var userId = 2;

  return UserController.getUserData(userId)
    .then((data) => {
      res.send(data.dataValues);
    });
};

module.exports = getUserInfo;