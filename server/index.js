const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true })
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log('error'));

const express = require('express');
var bookingHelpers = require('../database/controllers/bookingController');
var listingHelpers = require('../database/controllers/listingController');
// var Listing = require('../database/models/Listing');
// var Booking = require('../database/models/Booking');

let app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));


//get all listings
app.get('/listings', (req, res) => {
  listingHelpers.getAllListings(data => {
    res.json(data);
  })
});

//still need to fix helper function!
app.get('/listings/:id', (req, res) => {
  let listingObj = listingHelpers.findListingById(Number(req.params.id));
  res.send(listingObj);
  res.status(200);
});

//get all bookings
app.get('/bookings', (req, res) => {
  bookingHelpers.getAllBookings( data => {
    res.json(data);
  })
});


// app.post('listings', (req, res) => {
//   res.status(201);
//   res.send(Listings.addOne(req.body));
// });

// //get request for all bookings
// app.get('/bookings', function(req, res) {
//   res.send(Bookings.getAll());
// })

// app.post('/bookings', (req, res) => {
//   res.status(201);
//   res.send(Bookings.addOne(req.body));
// });

//get all bookings in listing by listing_id
// app.get('/bookings/:id', (req, res) => {
//   console.log('REQ.PARAMS IS: ' + req.params.id);
//   var bookingsArr = [];
//   bookingsArr.push(bookingHelpers.getAllBookingsInListingByListingId(Number(req.params.id), data => {
//     console.log(Array.isArray(data));
//     console.log(data.length);
//     console.log('BOOKING ARRAY IS: ' + data);
//     res.json(data);
//     res.status(200);
//     console.log(data[0]);
//   }));
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


let port = 3002;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});