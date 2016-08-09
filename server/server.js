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

app.get('/calendarAuth', function(req, res) {
  res.redirect('https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&response_type=code&client_id=620726441303-q3js1bc42tijrvh1i16u611gipn8ofrh.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Fhi');
})

app.get('/hi', function(req, res) {
  res.send('Getting authorization code');
  console.log(req.query);
})

app.listen(9000, () => {
  console.log('listening to port 9000');
});