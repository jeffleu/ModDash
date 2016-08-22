const jwt = require('jsonwebtoken');

const tokenOptions = { issuer: 'NeverMissOut' };

const signJWT = function(userId) {
  var token = jwt.sign({userId}, process.env.JWT_SECRET, tokenOptions);
  return token;
};

// const verifyJWT = function(token) {
//   return jwt.verify(token, process.env.JWT_SECRET, tokenOptions)
// };


module.exports = {
  signJWT
  // verifyJWT
};