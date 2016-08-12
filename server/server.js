const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/db.js');
const router = require('./routes');
const server = require('http').Server(app);
const pubnub = require ('./pubnub');

const mapsWorker = require('./workers/mapsWorker');

// https://github.com/foreverjs/forever
// use forever.js to restart the server if it crashes.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public/dist/')));

app.all('/api/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
  if (req.method.toLowerCase() !== "options") {
   return next();
  }
  return res.send(204);
})
app.use('/api', router);

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname + '/../client/src/index.html'));
});

// app.get('/api/')

server.listen(9000, () => {
  console.log('Express is listening on port 9000.');
});
