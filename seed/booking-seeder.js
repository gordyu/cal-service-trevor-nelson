var Booking = require('../database/models/Booking');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


let j = 0;
let storageArr = [];
for (let i = 0; i < 100; i++) {
  storageArr.push(Booking(

    {
      id: j++,
      listing_id: i,
      booking_start: 2019-05-01,
      booking_end: 2019-05-03
    },
    {
      id: j++,
      listing_id: i,
      booking_start: 2019-05-08,
      booking_end: 2019-05-11
    },
    {
      id: j++,
      listing_id: i,
      booking_start: 2019-05-14,
      booking_end: 2019-05-18
    },
    {
      id: j++,
      listing_id: i,
      booking_start: 2019-05-24,
      booking_end: 2019-05-26
    },
    {
      id: j++,
      listing_id: i,
      booking_start: 2019-05-28,
      booking_end: 2019-05-29
    },
    {
      id: j++,
      listing_id: i,
      booking_start: 2019-06-04,
      booking_end: 2019-06-09
    },
    {
      id: j++,
      listing_id: i,
      booking_start: 2019-06-17,
      booking_end: 2019-06-25
    },
    {
      id: j++,
      listing_id: i,
      booking_start: 2019-07-10,
      booking_end: 2019-07-15
    },
    {
      id: j++,
      listing_id: i,
      booking_start: 2019-07-19,
      booking_end: 2019-07-22
    },
    {
      id: j++,
      listing_id: i,
      booking_start: 2019-07-24,
      booking_end: 2019-07-30
    }

  ));
};



Booking.deleteMany({}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('database cleared');
    Booking.insertMany(storageArr, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('database seeded!') 
        Booking.find({}, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        });
      }
    });
  }
});