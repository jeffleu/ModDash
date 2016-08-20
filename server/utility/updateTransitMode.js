const User = require('../db/queries').User;

const updateTransitMode = (req, res) => User.updateUserTransitMode(req.userId, req.body.transit);

module.exports = updateTransitMode;