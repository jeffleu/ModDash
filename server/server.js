const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/../client'));

app.get('/'., function(req, res) {
  res.sendFile(path.join(__dirname, '/client/src/index.html'));
})

app.listen(9000, () => {
  console.log('listening to port 9000')
})
