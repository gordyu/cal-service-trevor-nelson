const expect = require('chai').expect
const db = require("../database/db.js") 



describe("DB METHODS TEST BEGIN  ~ ~ ~ ~ ~ ~ ~ Create", () => {
	before(function(done){
		db.Booking.deleteMany({}, (err) => {
			if (err) {
				console.log(err);
			} 
			db.Listing.deleteMany({}, (err) => {
				if (err) {
					console.log(err);
				} 
				done()
				})
		})
	}	)


it('Should be able to add one record to the DB', (done) => {

	db.createListing({
		id: 48,
		listing_Name: 'Trevors treehouse of magic vacations',
		host_name: 'James Franko',
		max_guests: 24,
		reservations: [],
		listing_price: 239
	}, (err, data) => {
		if(err) throw err;
	
		expect(err).to.equal(null);
		expect(data.host_name).to.equal('James Franko')
		done()
	})
	
})
it('Should be able to add two reservations to the DB', (done) => {

	db.createBooking(48, {
		record: 0,
		booking_start: '2019-05-01',
		booking_end:  '2019-06-01'
	}, (e, d) => {
		if(e) throw e;
		if(d){

		}
		db.createBooking(48, {
			record: 1,
			booking_start: '2019-02-14',
			booking_end:  '2019-9-01'
		}, (err, data) => {
			if(err) throw err;
			if(data){

			}
			db.serveListing(48, (err, data) => {
				expect(data.reservations.length).to.equal(2)
				expect(JSON.stringify(data.reservations[1].booking_start)).to.equal('"2019-02-14T00:00:00.000Z"')
				expect(JSON.stringify(data.reservations[0].booking_start)).to.equal('"2019-05-01T00:00:00.000Z"')
				done()
			})
		})
	})
})


})
describe("Read", ()=> {
	it('Should be able to read one listing record to the DB', (done) => {
		db.serveListing(48, (err, results)=> {
			if(err) throw err;
			expect(err).to.equal(null)
			expect(results.max_guests).to.equal(24)
			done()
		})
	})
	it('Should be able to view one specific booking record', (done) => {
		db.serveBooking(48, 0,  (err, results)=> {
			if(err) throw err;
			expect(err).to.equal(null)
			expect(results.listing_id).to.equal(48)
			expect(results.booking_end).to.exist
			done()
		})
	})
	it('Should be able to view all booking records on the listing', (done) => {
		db.serveBooking(48, null,  (err, results)=> {
			if(err) throw err;
			expect(err).to.equal(null)
			expect(results[0].listing_id).to.equal(48)
			expect(results).to.be.an('array')
			expect(results.length).to.equal(2)
			done()
		})
	})
})
describe("Update", ()=> {
	it('Should be able to update one record on the DB', (done) => {
		db.serveListing(48, (err, data)=> {
			expect(data.listing_price).to.equal(239)

			db.editListing(48, {listing_price: 245}, (err, results)=> {
				if(err) throw err;
				expect(err).to.equal(null)
				expect(results.ok).to.equal(1)
				expect(results.nModified).to.equal(1)

				db.serveListing(48, (err, data)=> {
					expect(data.listing_price).to.equal(245)
					done()
				})
			})
		})

	})
	it('Should be able to update one indiviual booking on the DB', (done) => {
		db.editBooking(48, 0,{booking_start: '2016-06-06', booking_end: '2026-06-06', }, (err, data) => {
		expect(JSON.stringify(data[0].booking_end)).to.equal('"2019-09-01T06:00:00.000Z"')

			done()
		
		} )
	})




})
describe("Delete", ()=> {
	it('Should be able to delete one individual booking on the DB', (done) => {
		db.removeBooking(48, 1, (err, data)=> {
			// console.log(data)
			db.serveListing(48, (err, data)=> {
				expect(err).to.equal(null);
				expect(data.reservations.length).to.equal(1)
				// console.log(data)
				done();
			})
		})
	})

			
	it('Should be able to delete one listing on the DB', (done) => {
		db.removeListing(48, (err, results)=> {
			expect(results.deletedCount).to.equal(1)

			db.serveListing(48, (err, data)=> {
				expect(err).to.equal(null);

				expect(data).to.equal(null)
				// console.log(data)
				done();
			})
		})
	})

})

