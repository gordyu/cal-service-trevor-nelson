require('newrelic');
const express = require('express');
const db = require('../database/postgres/db.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
const responseTime = require('response-time')

const app = express();
const client = redis.createClient();

client.on('error', (err) => {
	console.log("ERROR " + err);
})

app.use(responseTime())
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));
app.use('/', express.static(`${__dirname}/../public`));

//listing (main) routes - - - - - -- - - - - - -- - - - - - -- - - - - - -- - - - - - --
app.post('/', (req, res) => {
	var newListing = req.body;
	db.create(newListing, 'bnblist', (err, data) => {
		if (err) console.log('error in app.POST (main)'), res.status(404).send('failure!');
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
	const query = (req.query.query).trim();
	const searchURL = `http://localhost:3002/${req.params.id}`
	 client.get(`listings:${query}`, (err, result) => {
		if(result){
			const resultJSON = JSON.parse(result);
		 	return res.status(200).json(resultJSON);
		} else {
			db.findListingID(req.params.listingId, (err, data) => {
						if (err) console.log('error with serving listing', err);
						else {
							const responseJSON = data;
					client.setex(`listings:${query}`, 3600, JSON.stringify({source:'Redis Cache', ...responseJSON, }))
				return 	res.status(200).json({source:'Redis Cache', ...responseJSON, })
			}
	});
		}
	})
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
