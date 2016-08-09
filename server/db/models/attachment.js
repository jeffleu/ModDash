const Sequelize = require('sequelize');
const db = require('../db.js');

module.exports = db.define('attachment', {
  fileUrl: Sequelize.STRING,
  filetype: Sequelize.STRING
});