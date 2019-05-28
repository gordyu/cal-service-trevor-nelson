const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true })
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log('error'));


let booking = mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  listing_id: {type: Number, required: true},
  booking_start: {type: Date, required: true},
  booking_end: {type: Date, required: true}
});

let Booking = mongoose.model('Booking', booking);

module.exports = Booking;

