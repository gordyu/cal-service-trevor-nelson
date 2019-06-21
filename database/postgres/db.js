const { Pool, Client } = require('pg');
const { dbIP, dbIPPublic } = require('./SeedSilo/keys.js');
// process.env.DATABASE_URL = 'http://' + dbIP + ':5432/listings';
// process.env.DATABASE_URL = dbIP + ':5432/listings';
// process.env.DATABASE_URL = dbIP;
// process.env.DATABASE_URL = dbIP + ':5432';
// http://localhost:3002/

// const connectionString = process.env.DATABASE_URL;
// console.log(connectionString);
// const pool = new Pool({
// 	connectionString
// });

const pool = new Pool({
	user     : 'postgres',
	host     : dbIPPublic,
	database : 'listings',
	port     : 5432
});

const createBookingTableString =
	'CREATE TABLE bookings(id SERIAL PRIMARY KEY, cust_name VARCHAR (100) NOT NULL, host_id INTEGER REFERENCES bnbList(id),booking_start DATE NOT NULL, booking_end DATE NOT NULL)';
const createListingsTableString =
	'CREATE TABLE bnbList(id serial PRIMARY KEY, listing_name VARCHAR (200) NOT NULL, host_name VARCHAR (100) NOT NULL, max_guests integer NOT NULL, listing_price integer NOT NULL)';

const randomIndex = 1 + Math.floor(Math.random() * 3);

const dbLoader = (table, filepath, callback) => {
	pool.query(`COPY ${table} FROM '${filepath}';`, (err, resp) => {
		callback(err, resp);
	});
};

// - - - - THE functions right below are just setup/removal of tables- - - - - - - - - - - - - -
const preinitialize = (callback) => {
	// do not pass this on. I only did this dumb functional program call because I wasnt sure what to do with pool.end()
	pool.query(createListingsTableString, (err, resp) => {
		if (err)
			console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ error in initailize listings'), console.log(err);
		else {
			// console.log(resp);
			// console.log('------------------------------------');
			// console.log('created the table: listings');
			// console.log('------------------------------------');
		}
		callback(createBookingTableString);
	});
};
const initialize = () => {
	preinitialize((nextTable) => {
		pool.query(nextTable, (err, resp) => {
			if (err)
				console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ error in initailize bookings'), console.log(err);
			else {
				console.log(resp);
				console.log('------------------------------------');
				console.log('created the table:  bookings');
				console.log('------------------------------------');
			}
			pool.end();
		});
	});
};

const dropTable = (tableName, end, callback) => {
	pool.query(`DROP TABLE ${tableName}`, (err, resp) => {
		if (err) console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ error in tabledrop'), console.log(err);
		else {
			console.log(resp);
			console.log('------------------------------------');
			console.log('dropped the table: ', tableName);
			console.log('------------------------------------');
		}

		if (end) {
			callback();
			pool.end();
		} else {
			callback();
		}
	});
};

const drop = () => {
	dropTable('bookings', null, () => {
		dropTable('bnblist', true, () => {});
	});
};

const reset = () => {
	dropTable('bookings', null, (blah) => {
		dropTable('bnblist', null, (blahgh) => {
			initialize();
		});
	});
};
// - - - - - - - - - - - - -- - - - - - - - - - - - -- - - - - - - - - - - - -- - - - - - - - - - - - -

// - - - - - - - - BEGIN Actual crud methods - -- - - - - - - - - - - - -- - - - - - - - - - - - -
const create = function(row, table, callback) {
	if (table === 'bnblist') {
		var { id, listing_name, host_name, max_guests, listing_price } = row;
		// console.log(row);
		var listID = id || 'DEFAULT';
		// console
		// .log
		// `INSERT INTO bnblist VALUES (250000000, 'Tent on an IceRink', 'Hefty James Nelson', 12, 32)`
		// ();
		pool.query(
			`INSERT INTO ${table} VALUES (${listID}, '${listing_name}', '${host_name}', ${max_guests}, ${listing_price});`,
			(err, resp) => {
				if (err) callback(err, null);
				else {
					// console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ error in pg create bookings', err),

					callback(null, 'succes in adding to listings table.');
					// console.log('------------------------------------');
					// // console.log('succes in adding to listings table.');
					// console.log('------------------------------------');
				}
				// pool.end()
			}
		);
	} else if (table === 'bookings') {
		var { id, cust_name, host_id, booking_start, booking_end } = row;
		var bookID = id || 'DEFAULT';
		pool.query(
			`INSERT INTO ${table} VALUES (${bookID}, '${cust_name}', ${host_id}, '${booking_start}', '${booking_end}')`,
			(err, resp) => {
				if (err)
					console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ error in pg insert bookings'),
						callback(err, null);
				else {
					callback(null, 'succes in adding to bookings table.');
					// console.log('------------------------------------');
					// console.log('succes in adding to bookings table.');
					// console.log('------------------------------------');
				}
				// pool.end()
			}
		);
	}
};

const find = function(table, key, value, callback) {
	// var startTime = Date.now();
	pool.query(`SELECT * FROM ${table} WHERE ${key} = ${value};`, (err, resp) => {
		if (err || resp.rows.length === 0) {
			// console.log(Date.now() - startTime);
			if (err) callback(err, null), console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ error in pg find');
			else {
				console.log('kinda working?');
				callback('emty array was returned from find', null);
			}
		} else {
			console.log('SUCESS _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _ ');
			console.log(resp.rows);
			// console.log(Date.now() - startTime);
			// console.log('------------------------------------');
			// console.log('succes in pg find.');
			// console.log('------------------------------------');
			callback(null, resp.rows);
		}
		// pool.end()
	});
};

const findBookingID = (bookingID, callback) => {
	find('bookings', 'id', bookingID, (err, data) => {
		if (err) {
			callback(err, null);
		} else {
			callback(null, data);
		}
	});
};
const findListsBookings = (host_id, callback) => {
	find('bookings', 'host_id', host_id, (err, data) => {
		if (err) {
			callback(err, null);
			throw err;
		} else {
			callback(null, data);
		}
	});
};
const findListingID = (number = randomIndex, callback) => {
	console.log('------------------------------------');
	console.log('findListingID is firing');
	console.log('------------------------------------');
	find('bnblist', 'id', number, (err, data) => {
		if (err) {
			console.log('------------------------------------');
			console.log('findListingID is erroring');
			console.log('------------------------------------');
			callback(err, null);
		} else {
			console.log('------------------------------------');
			console.log('findListingID is suceeding');
			console.log('------------------------------------');
			callback(null, data);
		}
	});
};

const update = function(updates, table, key, value, callback) {
	var changes = '';
	for (var item in updates) {
		changes += `${item} = '${updates[item]}',`;
	}
	changes = changes.slice(0, -1);
	// console.log(changes);

	pool.query(
		`UPDATE ${table} SET ${changes} WHERE ${key} = 
	'${value}';`,
		(err, resp) => {
			if (err) {
				callback(err, null), console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ error in pg update');
			} else {
				// console.log('------------------------------------');
				// console.log('succes in pg update.');
				// console.log('------------------------------------');
				callback(null, resp);
			}
			// pool.end()
		}
	);
};

const getbookingDates = (host_id, callback) => {
	// var start = Date.now();
	pool.query(`SELECT booking_start, booking_end FROM bookings WHERE host_id = ${host_id};`, (err, data) => {
		if (err) console.log(err), callback(err, null);
		else {
			// console.log(Date.now() - start);
			callback(null, data);
		}
	});
};

const join = (host_id, callback) => {
	console.log('- - - - - - - - - - - - - -- - - - - join is firing');
	// var start = Date.now();
	pool.query(
		`SELECT * FROM bookings INNER JOIN bnblist ON bnblist.id  = bookings.host_id WHERE host_id = ${host_id}`,
		(err, data) => {
			if (err) console.log(err), callback(err, null), console.log('- - - - - - - - - join errored');
			else {
				console.log('- - - - - - - - - - - - - -- - - - - join is suceeding');
				// console.log('trevor');
				// console.log(Date.now() - start);
				callback(null, data.rows);
			}
		}
	);
};

const remove = function(table, key, value, callback) {
	pool.query(
		`DELETE FROM ${table} WHERE ${key} = 
	'${value}';`,
		(err, resp) => {
			if (err) {
				callback(err, null), console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ error in pg delete');
			} else {
				// console.log('------------------------------------');
				// console.log('succes in pg delete.');
				// console.log('------------------------------------');
				callback(null, resp.rows);
			}
			// pool.end()
		}
	);
};
// - - - - - - - - - - - - -- - - - - - - - - - - - -- - - - - - - - - - - - -- - - - - - - - - - - - -

module.exports = {
	create,
	getbookingDates,
	find,
	findListingID,
	findListsBookings,
	findBookingID,
	update,
	dropTable,
	remove,
	initialize,
	drop,
	reset,
	join,
	dbLoader
};

// update({"host_name": 'farts'}, 'bnblist', 'max_guests', 12, (err, data)=> {
// 	console.log(err, data)
// })

// create({
//   id: false,
// 		listing_name: 'jakes house',
//       host_name: 'notjake',
//       max_guests: 5,
//       listing_price: 200
// }, 'bnblist');
// create({
//  	 		id: false,
// 			cust_name: 'Jesus Christ',
//       host_id: 2,
//       booking_end:'2019-06-10',
// 			booking_start: '2019-06-17'
// }, 'bookings');
