const fs = require('fs');
const path = require('path');
const faker = require('faker');
const moment = require('moment');
const db = require('./db.js');
// BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS
// BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS

const seedFilePath = path.join(__dirname, './SeedSilo/seedFileBookings.tsv');
// BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS
// BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS
// BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS
// BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS

//604800 - 7 days in unix time
var numSeeds = 10000000;
// var numSeeds = 4
const bookingCreate = (i) => {
	var randomUnixTime = 1556668800 + Math.floor(Math.random() * 36892800); // picks a random day between now and july 1th 2020
	var randomEndDate = randomUnixTime + 86400 + Math.floor(Math.random() * 604800); //random end date 1-3 days alter...

	// BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS
	var seedObj = {
		cust_name     : `${faker.name.findName()}`,
		host_id       : Math.floor(Math.random() * 1000000),
		booking_start : moment.unix(randomUnixTime).format('YYYY-MM-DD'),
		booking_end   : moment.unix(randomEndDate).format('YYYY-MM-DD')
	};
	return seedObj;
}; // BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS

// BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS

module.exports = function() {
	fs.writeFile(seedFilePath, '', 'utf8', (err, data) => {
		if (err) console.error(err);
		else {
			fs.open(seedFilePath, 'r+', (err, fd) => {
				if (err) console.error(err);
				else {
					console.log('------------------------------------');
					console.log('Opened file  for BOOKINGS @' + Date());
					console.log('------------------------------------');
					// BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS
					const recurser = (n) => {
						if (n > numSeeds) {
							console.log('------$-------------$----------$-------');
							console.log('FileWrite complete for BOOKINGS @' + Date());
							console.log('--$-----------$-------------$---------$-');
							return; // db.dbLoader('bookings', seedFilePath, (err, data) => {
							// 	if (err) console.error(err);
							// 	else {
							// 		console.log('-!------!---!-------!-----!----!-------!--');
							// 		console.log('..............Loaded BOOKINGS into DB sucessfully @ ' + Date());
							// 		// BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS
							// 		console.log('----!--!----!----!- - - - !---!--!----!----!--');
							// 		return;
							// 	}
							// });
						}
						// BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS
						var { cust_name, host_id, booking_start, booking_end } = bookingCreate(n);
						var inputString = `${n}\t${cust_name}\t${host_id}\t${booking_start}\t${booking_end}\n`;
						fs.write(fd, inputString, (err) => {
							if (err) console.error(err);
							recurser(n + 1);
						});
					};
					recurser(0);
				}
			});
		}
	});
}; // BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS BOOKINGS
