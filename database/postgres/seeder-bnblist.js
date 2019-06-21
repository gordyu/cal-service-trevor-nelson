const db = require('./db');
const path = require('path');
const seedFilePath = './SeedSilo/seedFileListings.csv';

db.dbLoader('bnblist', seedFilePath, (err, data) => {
	if (err) console.error(err);
	else {
		console.log('-!------!---!-------!-----!----!-------!--');
		console.log('..............Loaded BOOKINGS into DB sucessfully @ ' + Date());
		// BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS
		console.log('----!--!----!----!- - - - !---!--!----!----!--');
		return;
	}
});
// config / seedFileListings.csv;
