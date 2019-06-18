// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/cal', { useNewUrlParser: true })
//         .then(() => console.log('MongoDB connected...'))
//         .catch(err => console.log('error'));



// // - - - - - - -- - - - - - - - - -- - - - - - - - - -- - - - - - - - - -- - - 
// const bookingSchema = mongoose.Schema({
//   record: Number,
//   listing_id: Number,
//   booking_start: Date,
//   booking_end: Date
// });

// const listingSchema = mongoose.Schema({
//   id: Number,
//   listing_name: String,
//   host_name: String,
//   max_guests: Number,
//   reservations: [bookingSchema],
//   listing_price: Number
// });

// let Booking = mongoose.model('Booking', bookingSchema);
// let Listing = mongoose.model('Listing', listingSchema);

// // - - - - - - -- - - - - - - - - -- - - - - - - - - -- - - - - - - - - -- - - 

// const save = (reservation) => {
//   reservation.save();
// };


// // - - - - - - -- - - - - - - - - -- - - - - - - - - -- - - - - - - - - -- - - 
// const createListing = (listing, callback) => {
//   Listing.create(listing, (err, data) => {
//     if (err) callback(err, null);
//     else callback(null, data);
//   })
// };

// const serveListing = (listingId, callback) => {
//   Listing.findOne({ id: listingId }).exec((err, data) => {
//     if (err) callback(err, null);
//     else callback(null, data);
//   });
// };


// const editListing  = (listingId, options, callback) => {
//   Listing.update({id: listingId}, options, (err, data) => {
//     if(err) callback(err, null);
//     if(data) callback(null, data)
//   })
// }

// const removeListing =  (listingId, callback) => {

//   Listing.deleteOne({id: listingId}, (err, data) => {
//     if(err) callback(err, null)
//     if(data) callback(null, data)
//   })
// }


// // - - - - - - -- - - - - - - - - -- - - - - - - - - -- - - - - - - - - -- - - 
// const createBooking = (listingId, booking, callback) => {
//   var { booking_start, booking_end, record } = booking;
//   Listing.update({id: listingId}, {$push: {reservations: ({record, listing_id: listingId,  booking_start,
//   booking_end})}}, (err,data)=> {
//     if(err) callback(err, null);
//     if(data) callback(null, data)
//   })
// };

// const serveBooking = (listingId, bookingId, callback) => {
//   serveListing(listingId, (err, data)=> {
//     if(err) callback(err, null)

//   var bookings = data.reservations
//   if(bookingId === null){
//     callback(null, bookings);
//   } else {
//    var booking =  bookings.filter((bookedStay) => {
//       return bookedStay.record === bookingId
//    })[0]
//    callback(null, booking)
//   }
//  })
// };

// const editBooking  = (listingId, record,  dates, callback) => {
//   serveBooking(listingId, null, (err, data) => {
//     var original;
//     console.log('------------------------------------');
//     console.log(record);
//     console.log('------------------------------------');
//     var spliced = data.filter((reservation, index) => {
//       if(reservation.record === record.toString()){
//         original = reservation;
//       }
//       return reservation.record !== record.toString()
//     })
//     console.log('------------------------------------');
//     console.log(spliced)
//     console.log('------------------------------------');
//     // var spliced = data.lice(bookingId-1, 1)
//     // console.log(data)
//     var obj = {}
//     var sliced = Object.assign(obj, original)
//     sliced.listing_id = listingId;
//     sliced.record = record;
//     delete sliced.booking_start
//     delete sliced.booking_end
//     sliced.booking_end = dates.booking_end;
//     sliced.booking_start = dates.booking_start;
//     spliced.push(sliced);
//     console.log('------------------------------------');
//     console.log(spliced)
//     console.log('------------------------------------');

//     editListing(listingId, {reservations: spliced}, (err, results)=>{
//       if(err) callback(err, null)
//       else {
//         callback(null, spliced)
//       }
//     })
//   })
// };

// const removeBooking = (listingId, bookingId, callback) => {
//   serveBooking(listingId, null, (err, data) => {
//     var spliced = data.filter(reservation => {
//       return reservation.record !== bookingId
//     })
//     // console.log(spliced)
//     editListing(listingId, {reservations: spliced}, (err, results)=>{
//       if(err) callback(err, null)
//       else {
//       callback(null, 'deleted')
//       }
//     })
//   })
// };

// // - - - - - - -- - - - - - - - - -- - - - - - - - - -- - - - - - - - - -- - - 



// const dropDB = function(callback, DB) {
//   console.log('dropping')
//   Booking.collection.drop();
//   Listing.collection.drop();
//   callback()
// }


// module.exports = {serveListing ,removeListing, editListing, createListing, save, dropDB, Booking, Listing, createBooking, serveBooking, editBooking, removeBooking}

