const Sequelize = require('sequelize');
const db = require('../db/db.js');

module.exports = db.define('travel', {
  startingPoint: Sequelize.STRING,
  queryTime: Sequelize.DATE,
  initialEstimate: Sequelize.INTEGER,
  trafficEstimate: Sequelize.INTEGER,
  mapsUrl: Sequelize.STRING,
  notificationTime: Sequelize.DATE
});