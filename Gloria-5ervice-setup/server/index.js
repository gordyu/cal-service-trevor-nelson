const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

// var Booking = require('../models/booking');
// var Calendar = require('../models/calendar');
// var Listing = require('../models/listing');
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

app.post('/listings', function (req, res) {
  console.log('hihi');
  console.log(req.body);
  //get listing info of one
  Listing.findeOne(req.body, function(listingObj) {
    db.save(listingObj);
  });
  //console.log(req.body)
  res.end('yay got to end')
});

// app.get('/calendars', function(req, res) {
//   db.fetch(function(data) {
//     res.json(data);
//   })
// });

app.get('/listings', function(req, res) {
  db.fetch(function(listings) {
    res.json(listings);
  });
});

let port = 3002;

app.listen(port, function() {
  console.log(`listening to you working on port ${port}`);
});