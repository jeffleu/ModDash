const Sequelize = require('sequelize');
const db = require('../db/db.js');

module.exports = db.define('calendar', {
  name: Sequelize.STRING
});