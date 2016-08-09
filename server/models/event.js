const Sequelize = require('sequelize');
const db = require('../db/db.js');

module.exports = db.define('event', {
  googleCalendarEventId: Sequelize.INTEGER,
  name: Sequelize.STRING,
  eventUrl: Sequelize.STRING,
  startDateTime: Sequelize.DATE,
  endDateTime: Sequelize.DATE,
  allDay: Sequelize.BOOLEAN,
  recurrence: Sequelize.STRING,
  location: Sequelize.STRING,
  description: Sequelize.STRING
});