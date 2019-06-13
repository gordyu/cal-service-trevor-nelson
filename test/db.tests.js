const expect = require('chai').expect;

const db = require('../database/postgres/db.js');

var randomId = 800000 + Math.floor(Math.random() * 200000);

describe('DB tests', () => {
	it('Will get all of the bookings from the DB for one listing ', (done) => {
		db.find('bookings', 'host_id', randomId, (err, data) => {
			expect(err).to.equal(null);
			// console.log(data);

			done();
		});
	});
	it('Will get just the booking start and end dates from the DB for one listing ', (done) => {
		db.getbookingDates(randomId, (err, data) => {
			expect(err).to.equal(null);
			console.log(err);
			// console.log(data);
			done();
		});
	});
	it('Will get one booking from the DB based on id ', (done) => {
		db.findBookingID(randomId, (err, data) => {
			expect(err).to.equal(null);
			// console.log(data);
			done();
		});
	});
	it('Will get one listing from the DB based on id ', (done) => {
		db.findListingID(randomId, (err, data) => {
			expect(err).to.equal(null);
			// console.log(data);
			done();
		});
	});
	it('can join both tables to create a hybrid record ', (done) => {
		db.join(randomId, (err, data) => {
			expect(err).to.equal(null);
			// console.log(data);
			done();
		});
	});
});

// (650+718+653+697+735+642+1023+627+715+840+630+620 + 672 + 687 + 608)/15

// (1+2+1+2+1+2+2+2+3+3+2+1 + 2 + 1 + 2)/15

// (5+59+4+5+6+66+4+4+3+53+6+4 + 4 + 60 + 6)/15
