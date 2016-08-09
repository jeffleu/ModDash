const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/db.js');
const models = require('./models/models.js');

app.use(express.static(path.join(__dirname, '../client/src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/src/index.html'));
});

app.listen(9000, () => {
  console.log('listening to port 9000');
});