const Sequelize = require('sequelize');
const db = require('../db/db.js');

module.exports = db.define('attachment', {
  fileUrl: Sequelize.STRING,
  filetype: Sequelize.STRING
});