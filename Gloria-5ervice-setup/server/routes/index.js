var express = require('express');
var router = express.Router();
// var Booking = require('../models/booking');
// var Calendar = require('../models/calendar');
// var Listing = require('../models/listing');

/* GET */
router.get('/', function(req, res, next) {
  var listings = Listing.find();
  res.send();
})

router.get('/', function(req, res, next) {
  var dates = Calendar.find();
  res.send();
})

router.get('/', function(req, res, next) {
  var bookings = Booking.find();
  res.send();
})

/* POST */
//join table in post


module.exports = router;