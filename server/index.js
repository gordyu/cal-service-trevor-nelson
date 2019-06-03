const express = require('express');
const db = require('../database/db.js');
const seeder = require('../database/seeder.js');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));
app.use('/:id', express.static(`${__dirname}/../public`));


app.get('/seedDb', (req, res) => {
  res.send('success');
});

//gets all reservations at a specific listing id!
app.get('/api/listings/:listingId/reservations', (req, res) => {
  db.serveListing(req.params.listingId, (err, data) => {
    if (err) console.log('error with serving listing', err);
    else res.send(data);
  });
});

//get request for all listings
app.get('/listings', (req, res) => {
  db.Listing.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  }); 
});


app.get('/bookings', (req, res) => {
  db.Booking.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});


const port = 3002;
const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

setTimeout(() => server, 5000);




module.exports = server;