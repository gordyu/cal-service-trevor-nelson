const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true })
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log('error'));


const bookingSchema = mongoose.Schema({
  record: Number,
  listing_id: Number,
  booking_start: Date,
  booking_end: Date
});

const listingSchema = mongoose.Schema({
  id: Number,
  listing_name: String,
  host_name: String,
  max_guests: Number,
  reservations: [bookingSchema],
  listing_price: Number
});

let Booking = mongoose.model('Booking', bookingSchema);
let Listing = mongoose.model('Listing', listingSchema);

const save = (reservation) => {
  reservation.save();
};

const serveListing = (listingId, callback) => {
  Listing.findOne({ id: listingId }).exec((err, data) => {
    if (err) callback(err, null);
    else callback(null, data);
  });
};

module.exports.save = save;
module.exports.Booking = Booking;
module.exports.Listing = Listing;
module.exports.serveListing = serveListing;

