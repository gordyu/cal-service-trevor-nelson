const db = require('./db');
const path = require('path');
const seedFilePath = path.join(__dirname, './SeedSilo/seedFileBookings.csv');

db.dbLoader('bookings', seedFilePath, (err, data) => {
	if (err) console.error(err);
	else {
		console.log('-!------!---!-------!-----!----!-------!--');
		console.log('..............Loaded BOOKINGS into DB sucessfully @ ' + Date());
		// BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS
		console.log('----!--!----!----!- - - - !---!--!----!----!--');
		return;
	}
});
