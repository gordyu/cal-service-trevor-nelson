var Booking = require('../models/Booking');


exports.createBooking = function(newBooking, callback) {
  var newBooking = new Booking({
    id: newBooking.id,
    listing_id: newBooking.listing_id,
    booking_start: newBooking.booking_start,
    booking_end: newBooking.booking_end
  });

  newBooking.save({}, callback);
};
