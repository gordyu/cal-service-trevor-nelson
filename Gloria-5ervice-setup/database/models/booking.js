var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  id: {type: Number, required: true},
  listing_id: {type: Number, required: true},
  booking_start: {type: Date, required: true},
  booking_end: {type: Date, required: true}
});

exports.getAll

exports.getOne

exports.addOne

exports.updateOne

exports.deleteOne

//SAVE FUNCTION FOR SCHEMA
let save = (bookingObj) => {
  
  var bookingArr = [];
  var parsedBookings = JSON.parse(bookingObj.body); //array of individual bookings

  for (var i = 0; i < parsedBookings.length; i++) {
    var bookingObj = {};

    bookingObj.id = parsedBookings[i].id;
    bookingObj.listing_id = parsedBookings[i].listing_id;
    bookingObj.booking_start = parsedBookings[i].booking_start;
    bookingObj.booking_end = parsedBookings[i].booking_end;

    var booking = new Booking(bookingObj); //new document

    booking.save(function(err) {
      if (err) {
        console.log(err);
      }
    });

    bookingArr.push(bookingObj);
  }
  console.log('final product of save', bookingArray);

}




//EXPORT TO INDEX.JS SERVER TO USE

//booking is left table
//mongo left outer join

//joined table to return unavailability:
//get all dates in listing that are booked
  //where booking's listing_id = listing's listing_id
  //where required start and required end are both in the booking_start and booking_end
//whatever isn't in table is by default available

//endpoint /booking to book
//endpoint /calendar route with infos from join table

module.exports = mongoose.model('Booking', schema);