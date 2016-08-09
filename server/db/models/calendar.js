const Sequelize = require('sequelize');
const db = require('../db.js');

module.exports = db.define('calendar', {
  name: Sequelize.STRING
});