// const mongoose = require('mongoose');

// const retry = () => {
//   mongoose.connect('mongodb://localhost/fetcher').then(() => {
//     console.log('connected to database!');
//   }).catch(err => {
//     console.log(err, 'retry in 5 seconds');
//     setTimeout(retry, 5000);
//   });
// }
// retry();

// const bookingSchema = mongoose.Schema({
//   record: {type: Number, unique: true},
//   listing_id: Number,
//   max_guests: Number,
//   booking_start: Date,
//   booking_end: Date,
//   total_price: Number
// });

// const listingSchema = mongoose.Schema({
//   id: {type: Number, unique: true},
//   listing_name: String,
//   host_name: String,
//   reservations: [bookingSchema],
//   daily_rate: Number
// });

// const Booking = mongoose.model('Booking', bookingSchema);
// const Listing = mongoose.model('Listing', listingSchema);

// const save = (reservation) => {
//   reservation.save();
// };

// const serveListing = (listingId, callback) => {
//   Listing.findOne({ id: listingId }).exec((err, data) => {
//     if(err) callback(err, null);
//     else callback(null, data);
//   });
// };

// module.exports.save = save;
// module.exports.Listing = Listing;
// module.exports.Booking = Booking;
// module.exports.serveListing = serveListing;

// //"enzyme-adapter-react-16": "^1.13.0",