const Sequelize = require('sequelize');
const db = require('../db.js');

module.exports = db.define('user', {
  lastName: Sequelize.STRING,
  firstName: Sequelize.STRING,
  email: Sequelize.STRING,
  oauthToken: Sequelize.STRING
});