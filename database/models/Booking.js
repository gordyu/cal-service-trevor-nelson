const mongoose = require('mongoose');


let booking = mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  listing_id: {type: Number, required: true},
  booking_start: {type: Date, required: true},
  booking_end: {type: Date, required: true}
});

let Booking = mongoose.model('Booking', booking);

module.exports = Booking;
