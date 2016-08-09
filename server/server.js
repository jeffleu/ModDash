const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/db.js');
const router = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/src')));

app.use('/api', router);

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname + '/../client/src/index.html'));
});

app.listen(9000, () => {
  console.log('listening to port 9000');
});