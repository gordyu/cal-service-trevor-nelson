const express = require('express');
var bookingHelpers = require('../database/controllers/bookingController');
var listingHelpers = require('../database/controllers/listingController');
// var Listings = require('../database/models/Listing');
// var Bookings = require('../database/models/Booking');
const db = require('../database/db.js');
const seeder = require('../database/seeder.js');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));
// app.use('/:id', express.static(`${__dirname}/../public`));


app.get('/seedDb', (req, res) => {
  res.send('success');
});

// app.get('/api/listings/:listingId/reservations', (req, res) => {
//   db.serveListing(req.params.listingId, (err, data) => {
//     if (err) console.log('error with serving listing', err);
//     else res.send(data);
//   });
// });


//get request for all listings
app.get('/listings', function(req, res) {
  Listing.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  }); 
});

//get all listings
// app.get('/listings', (req, res) => {
//   listingHelpers.getAllListings(data => {
//     res.json(data);
//   })
// });

app.get('/bookings', (req, res) => {
  Booking.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

//get all bookings
// app.get('/bookings', (req, res) => {
//   bookingHelpers.getAllBookings( data => {
//     res.json(data);
//   })
// });

// //get entries at specific listing id
// app.get('/api/listings/:listingId/documents', (req, res) => {
//   db.serveListing(req.params.listingId, (err, data) => {
//     if(err) console.log('oops error', err);
//     else res.send(data);
//   });
// });

//get all start and end dates by listing id
//push each booking's start and end into tuple
app.get('/bookings/:id', (req, res) => {
  console.log('REQ.PARAMS IS: ' + req.params.id);
  var bookingsArr = [];
  bookingsArr.push(bookingHelpers.getAllBookingsInListingByListingId(Number(req.params.id), data => {
    console.log(Array.isArray(data));
    console.log(data.length);
    console.log('BOOKING ARRAY IS: ' + data);

    let outputArr = [];
    for (let i = 0; i < data.length; i++) {
      let tuple = [];
      let start = data[i].booking_start.toISOString().substring(0, 10);
      let end = data[i].booking_end.toISOString().substring(0, 10);
      tuple.push(start);
      tuple.push(end);
      outputArr.push(tuple);
    }
    console.log('OUTPUT IS ARRAY **** ' + outputArr);
    res.json(outputArr);
    res.status(200);
  }));
});


const port = 3002;
const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

setTimeout(() => server, 5000);




module.exports = server;