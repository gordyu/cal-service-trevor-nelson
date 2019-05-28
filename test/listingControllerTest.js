var Listing = require('../database/models/Listing');
var mongoose = require('mongoose');
var expect = require('chai').expect;
var listingHelpers = require('../database/controllers/listingController');

var dbURI = 'mongodb://localhost/fetcher';

// The `clearDB` helper function, when invoked, will clear the database
var clearDB = function (done) {
  mongoose.connection.collections['listings'].remove(done);
};

describe('Listing Controller', function () {
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
        var listings = [
          {
            id: 0,
            listing_name: 'Little House on the Prairie',
            host_name: 'Laura Ingalls Wilder',
            listing_price: 20
          },
          {
            id: 1,
            listing_name: 'Trannsylvania',
            host_name: 'Dracula',
            listing_price: 30
          },
          {
            id: 2,
            listing_name: 'Old Abandoned Home in Alabama',
            host_name: 'Boo Radley',
            listing_price: 10
          },
          {
            id: 3,
            listing_name: 'Hogwart\'s Dormitory',
            host_name: 'J.K. Rowling',
            listing_price: 50
          },
          {
            id: 4,
            listing_name: 'Beach House in Monterey',
            host_name: 'John Steinbeck',
            listing_price: 40
          }
        ];
  
        Listing.create(listings, done);
      });
    });
  
    it('should have a method that given the id of a listing, retrieves their record from the database', function (done) {

      var id = 0;
      listingHelpers.findListingById(id, (data) => {
        console.log(data);
        expect(data.id).to.equal(0);
        expect(data.listing_name).to.equal('Little House on the Prairie');
        expect(data.host_name).to.equal('Laura Ingalls Wilder');
        expect(data.listing_price).to.equal(20);
        done();
      })
    });
  
    it('should have a method that creates a new listing in the database', function (done) {
      
      var newListing = {
        id: 5,
        listing_name: 'Kenderhome',
        host_name: 'Tasselhoff Burrfoot',
        listing_price: 60
      };
  
      listingHelpers.createListing(newListing, (callback) => {
        Listing.findOne({'id': 5}, (err, data) => {
          if(err) {
            console.log(err);
          } else {
            expect(data.id).to.equal(5);
            expect(data.listing_name).to.equal('Kenderhome');
            expect(data.host_name).to.equal('Tasselhoff Burrfoot');
            expect(data.listing_price).to.equal(60);
            done();
          }
        });
      })
    });
  
    it('should have a method that reads all listings from the database at once', function (done) {

      listingHelpers.getAllListings(listings => {
        expect(listings.length).to.equal(5);
        done();
      })
    });
  });