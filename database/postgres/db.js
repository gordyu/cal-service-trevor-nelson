const  { Pool, Client } = require('pg');
// const connectionString = process.env.DATABASE_URL || 'postgresql://trevjnels:password@database.server.com:5432/listings';
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/listings';

const pool = new Pool({
	connectionString,
})

const randomIndex = 1 + Math.floor(Math.random() * 3)

const createBookingTableString = 'CREATE TABLE bookings(id serial PRIMARY KEY, cust_name VARCHAR (100) NOT NULL, host_id INTEGER REFERENCES bnbList(id),booking_start DATE NOT NULL, booking_end DATE NOT NULL)'
const createListingsTableString = 'CREATE TABLE bnbList(id serial PRIMARY KEY, listing_name VARCHAR (200) UNIQUE NOT NULL, host_name VARCHAR (100) NOT NULL, max_guests integer NOT NULL, listing_price integer NOT NULL)'

const dropTable  = (tableName) =>{
	pool.query(`DROP TABLE ${tableName}`, (err, resp) => {
		if(err) console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ error in tabledrop'), console.log(err);
		else{
			console.log(resp)
			console.log('------------------------------------');
			console.log('dropped the table: ', tableName);
			console.log('------------------------------------');
		}
		pool.end()
	})
}





const create = function(row, table){
	if(table === 'bnblist'){
		var {id, listing_name, host_name, max_guests, listing_price} = row;
		var listID = id || 'DEFAULT'
		pool.query(`INSERT INTO ${table} VALUES (${listID}, '${listing_name}', '${host_name}', ${max_guests}, ${listing_price})`, (err, resp) => {
			if(err) console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ error in pg create bookings'), console.log(err);
			else{
				console.log(resp)
				console.log('------------------------------------');
				console.log('succes in adding to listings table.');
				console.log('------------------------------------');
			}
			pool.end()
		})
	} else if (table === 'bookings') {
		var {id, cust_name, host_id, booking_start, booking_end} = row;
		var bookID = id || 'DEFAULT'
		pool.query(`INSERT INTO ${table} VALUES (${bookID}, '${cust_name}', ${host_id}, '${booking_start}', '${booking_end}')`, (err, resp) => {
			if(err) console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ error in pg insert bookings'), console.log(err);
			else{
				console.log(resp)
				console.log('------------------------------------');
				console.log('succes in adding to bookings table.');
				console.log('------------------------------------');
			}
			pool.end()
		})
	}
}



const find = function(table, key, value, callback){
		pool.query(`SELECT * FROM ${table} WHERE ${key} = ${value}`, (err, resp) => {
			if(err || resp.rows.length === 0) {
				if(err)	callback(err, null), console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ error in pg find')
				else {
					callback('emty array was returned from find', null)
				}
		}else{
				console.log('------------------------------------');
				console.log('succes in pg find.');
				console.log('------------------------------------');
				callback(null, resp.rows)
			}
			pool.end()
		})
}
const findListsBookings = (host_id, callback)  => {
	find('bookings', 'host_id', host_id, (err, data) => {
		if (err) {
			callback(err, null)
			throw err 
		} else {
			callback(null, data)
		}
	})
}
const findListingID = (number = randomIndex, callback) => {
	find('bnblist', 'id', number, (err, data) => {
		if (err) {
		callback(err, null)
		} else {

			callback(null, data)
		}
	})
}
const findBookingID = (number, callback) => {
	find('bookings', 'id', number, (err, data) => {
		if (err) {
		callback(err, null)
		} else {
			callback(null, data)
		}
	})
}



const update = function(updates, table, key, value, callback){
	var changes = ''
	for(var item in updates) {
		changes+= `${item} = "${updates[item]}",`
	}
	// changes = changes.slice(0, -1);
	// console.log(changes)

	pool.query(`UPDATE ${table} SET host_name = rainbow WHERE ${key} = ${value};`, (err, resp) => {
		if(err || resp.rows.length === 0) {
			if(err)	callback(err, null), console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ error in pg update')
	}else{
			console.log('------------------------------------');
			console.log('succes in pg update.');
			console.log('------------------------------------');
			callback(null, resp.rows)
		}
		pool.end()
	})
}

update({"host_name": 'trev'}, 'bnblist', 'id', 3, (err, data)=> {
	console.log(err, data)
})


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









module.exports = { create, find, findListingID, findListsBookings, findBookingID, update, dropTable }