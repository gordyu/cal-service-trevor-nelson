var expect = require('chai').expect;
var mongoose = require('mongoose');
var Booking = require('../database/models/Booking');
var bookingHelpers = require('../database/controllers/bookingController');


var dbURI = 'mongodb://localhost/fetcher';

// The `clearDB` helper function, when invoked, will clear the database
var clearDB = function (done) {
  mongoose.connection.collections['bookings'].remove(done);
};

describe('Booking Controller', function () {

  // Connect to database before any tests
  before(function (done) {
    if (mongoose.connection.db) {
      return done();
    }
    mongoose.connect(dbURI, done);
  });

  // Clear database before each test and then seed it with example `users` so that you can run tests
  beforeEach(function (done) {
    clearDB(function () {
      var bookings = [
        {
          id: 0,
          listing_id: 0,
          booking_start: '2019-05-01', 
          booking_end: '2019-05-03'
        },
        {
          id: 1,
          listing_id: 1,
          booking_start: '2019-05-08',
          booking_end: '2019-05-11'
        },
        {
          id: 2,
          listing_id: 2,
          booking_start: '2019-05-14',
          booking_end: '2019-05-18'
        },
        {
          id: 3,
          listing_id: 3,
          booking_start: '2019-05-24',
          booking_end: '2019-05-26'
        },
        {
          id: 4,
          listing_id: 4,
          booking_start: '2019-05-28',
          booking_end: '2019-05-29'
        }
      ];

      Booking.create(bookings, done);
    });
  });

  it('should have a method that given the listing id and booking dates, creates a new booking in the database', function (done) {
      
    var newBooking = {
      id: 5,
      listing_id: 10,
      booking_start: '2019-07-04',
      booking_end: '2019-07-08'
    };

    bookingHelpers.createBooking(newBooking, (callback) => {
      Booking.findOne({'listing_id': 10}, (err, data) => {
        if(err) {
          console.log(err);
        } else {
          expect(data.id).to.equal(5);
          expect(data.listing_id).to.equal(10);
          expect(data.booking_start.toISOString().split("T")[0]).to.equal('2019-07-04');
          expect(data.booking_end.toISOString().split("T")[0]).to.equal('2019-07-08');
          done();
        }
      });
    })
  });

  it('should have a method that given the id of a listing, returns all bookings in that listing', function (done) {

    var targetListingId = 1;
    bookingHelpers.getAllBookingsInListingByListingId(targetListingId, (callback) => {
      Booking.findOne({'listing_id': targetListingId}, (err,data) => {
        if(err) {
          console.log(err);
        } else {
          expect(data.listing_id).to.equal(1);
          expect(data.id).to.equal(1);
          expect(data.booking_start.toISOString().split("T")[0]).to.equal('2019-05-08');
          expect(data.booking_end.toISOString().split("T")[0]).to.equal('2019-05-11');
          done();
        }
      })
    })
  });

  it('should have a method that gets all bookings from the database at once', function (done) {

    bookingHelpers.getAllBookings(bookings => {
      expect(bookings.length).to.equal(5);
      done();
    })
  });

});
