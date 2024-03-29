require('newrelic');
process.env.NODE_ENV = 'production';

const express = require('express');
const db = require('../database/postgres/db.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
const responseTime = require('response-time');

const app = express();
const REDIS_URL = process.env.REDIS_URL;
const client = redis.createClient(REDIS_URL);

client.on('connect', () => {
	console.log('connected to reddis');
});

client.on('error', (err) => {
	console.log('ERROR ' + err);
});

app.use(responseTime());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));
app.use('/', express.static(`${__dirname}/../public`));

//listing (main) routes - - - - - -- - - - - - -- - - - - - -- - - - - - -- - - - - - --
app.post('/', (req, res) => {
	var newListing = req.body;
	// console.log(newListing);
	// var input = JSON.stringify(newListing);
	db.create(newListing, 'bnblist', (err, data) => {
		if (err) res.status(404).send('failure!');
		else res.status(200).send(data);
	});
});

app.put('/:listingId', (req, res) => {
	db.update(req.body, 'bnblist', 'id', req.params.listingId, (err, data) => {
		if (err) console.log('error in app.PUT (main)'), res.status(404).send('failure!');
		else res.status(200).send(data);
	});
});

app.get('/:listingId', (req, res) => {
	client.get(`${req.params.listingId}`, (err, cachedData) => {
		if (err) {
			db.findListingID(req.params.listingId, (err, data) => {
				if (err) console.log('error with serving listing', err);
				else {
					client.set(`${req.params.listingId}`, data, (err, data) => {
						res.send(data);
					});
				}
			});
		} else {
			res.send(cachedData);
		}
	});
});

app.get('/:listingId/bookings', (req, res) => {
	db.findListsBookings(req.params.listingId, (err, data) => {
		if (err) console.log('error with serving listing', err);
		else {
			res.send(data);
		}
	});
});
app.delete('/:listingId', (req, res) => {
	db.remove('bnblist', 'id', req.params.listingId, (err, data) => {
		if (err) console.log('error in app.DELETE (main)'), res.status(404).send('failure!');
		else console.log('sucessful deleting post'), res.status(200).send('deleted 1 listing');
	});
});
// - -  - - -- - - - - - -- - - - - - -- - - - - - -- - - - - - --  - - - - -- - - - - - -

//booking (dates) routes - - - - - -- - - - - - -- - - - - - -- - - - - - -- - - - - - --
app.post('/booking/:listingId', (req, res) => {
	var newBooking = req.body;
	newBooking.host_id = req.params.listingId;
	newBooking.id = false;
	db.create(newBooking, 'bookings', (err, data) => {
		if (err) console.log('error in app.POST (new reservation)'), res.status(404).send('failure!');
		else console.log('sucessful booking post'), res.status(200).send('sucessfully added booking');
	});
});

app.put('/booking/:bookingId', (req, res) => {
	db.update(req.body, 'bookings', 'id', req.params.bookingId, (err, data) => {
		if (err) console.log('error in app.PUT (edit reservation)'), res.status(404).send(err);
		else console.log('sucessful booking put'), res.status(200).send(data);
	});
});

app.get('/booking/:bookingId', (req, res) => {
	db.findBookingID(req.params.bookingId, (err, data) => {
		if (err) console.log('error in app.get (edit reservation)'), res.status(404).send('failure!');
		else console.log('sucessful booking get'), res.status(200).send(data);
	});
});

app.delete('/booking/:bookingId', (req, res) => {
	db.remove('bookings', 'id', req.params.bookingId, (err, data) => {
		if (err) console.log('error in app.get (edit reservation)'), res.status(404).send('failure!');
		else console.log('sucessful booking get'), res.status(200).send('deleted 1 bookingId');
	});
});
// - -  - - -- - - - - - -- - - - - - -- - - - - - -- - - - - - --  - - - - -- - - - - - -

const port = 3002;
const server = app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

setTimeout(() => server, 5000);

module.exports = server;
