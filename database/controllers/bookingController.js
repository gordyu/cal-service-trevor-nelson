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

// exports.findBookingByStart = function(name, callback) {
//   Booking.findOne({'listing_name': listing_name}, (err, data) => {
//     if(err) {
//       console.log('FIND BOOKING NAME ERROR' + err);
//     } else {
//       callback(data);
//     }
//   });
// };

exports.getAllBookings = function(callback) {
  Booking.find({}, (err, bookings) => {
    if (err) {
      console.log('GET ALL BOOKINGS' + err);
    } else {
      // console.log('success', listings);
      callback(bookings);
    }
  })
};

exports.getAllBookingsInListingByListingId = function(listingId, callback) {
  Booking.find({'listing_id': listingId}, (err, data) => {
    if(err) {
      console.log(err);
    } else {
      callback(data);
    }
  });
};

//create object/hashtable to store dates
  //dates currently stored in ISO format
    //ISODate("2019-05-03T00:00:00Z")
  //92 days
  //go through all dates
  //stringify start and end points (booking_start, booking_end)
  //every date will correspond to a number
    //tracking unavailble days vs available

exports.unavailableStartEndDates = function(inputArr) {
  let outputArr = [];
  for (let i = 0; i < inputArr.length; i++) {
    console.log('inputARR IS ****' + inputArr);
    console.log(typeof inputArr[0].booking_start);
    let start = inputArr[i].booking_start.toISOString().substring(0, 10);
    let end = inputArr[i].booking_end.toISOString().substring(0, 10);
    outputArr.push(start);
    outputArr.push(end);
  }
  console.log('OUTPUT ARRAY FROM UNAVAILABLE STARTENDDATES IS : **** ' + outputArr);
  console.log('length of output array ' + outputArr.length)
  return outputArr;
} 

exports.getAllUnavailableStartEndDatesByListingId = function(listingId, callback) {
  Booking.find({'listing_id': listingId}, (err, data) => {
    console.log('DATA ISSSSS ****: ' + data)
    if(err) {
      console.log(err);
    } else {
      callback(data);
    }
  });
};


// exports.getAllUnavailableStartEndDatesByListingId = function(listingId, callback) {
//   Booking.getAllBookingsInListingByListingId(listingId, (err, data) => {
//     if(err) {
//       console.log(err);
//     } else {
//       var bookingsArr = [];
//       bookingsArr.push(data);
//       callback(unavailableStartEndDates(bookingsArr));
//     }
//   });
// };

