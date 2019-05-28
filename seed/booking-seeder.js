var db = require('../database/models/Booking');

let j = 0;
let storageArr = [];
for (let i = 0; i < 100; i++) {
  
  storageArr.push(new db.Booking(
    {
      id: j++,
      listing_id: i,
      booking_start: '2019-05-01',
      booking_end: '2019-05-03'
  }));

  storageArr.push(new db.Booking(
    {
      id: j++,
      listing_id: i,
      booking_start: '2019-05-08',
      booking_end: '2019-05-11'
  }));

  storageArr.push(new db.Booking(
    {
      id: j++,
      listing_id: i,
      booking_start: '2019-05-14',
      booking_end: '2019-05-18'
  }));

  storageArr.push(new db.Booking(
    {
      id: j++,
      listing_id: i,
      booking_start: '2019-05-24',
      booking_end: '2019-05-26'
  }));

  storageArr.push(new db.Booking(
    {
      id: j++,
      listing_id: i,
      booking_start: '2019-05-28',
      booking_end: '2019-05-29'
  }));

  storageArr.push(new db.Booking(
    {
      id: j++,
      listing_id: i,
      booking_start: '2019-06-04',
      booking_end: '2019-06-09'
  }));
  
  storageArr.push(new db.Booking(
    {
      id: j++,
      listing_id: i,
      booking_start: '2019-06-17',
      booking_end: '2019-06-25'
  }));

  storageArr.push(new db.Booking(
    {
      id: j++,
      listing_id: i,
      booking_start: '2019-07-10',
      booking_end: '2019-07-15'
  }));

  storageArr.push(new db.Booking(
    {
      id: j++,
      listing_id: i,
      booking_start: '2019-07-19',
      booking_end: '2019-07-22'
  }));

  storageArr.push(new db.Booking(
    {
      id: j++,
      listing_id: i,
      booking_start: '2019-07-24',
      booking_end: '2019-07-30'
  }));

};



db.Booking.deleteMany({}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('database cleared');
    db.Booking.insertMany(storageArr, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('database seeded!') 
        db.Booking.find({}, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            // console.log(result);
          }
        });
      }
    });
  }
});