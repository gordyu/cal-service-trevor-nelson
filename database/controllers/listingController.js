var Listing = require('../db');

exports.createListing = function(newListing, callback) {
  var newListing = new Listing({
    id: newListing.id,
    listing_name: newListing.listing_name,
    host_name: newListing.host_name,
    listing_price: newListing.listing_price
  });

  newListing.save({}, callback);
};

exports.findListingById = function(listingId, callback) {
  Listing.findOne({'id': listingId}, (err, data) => {
    if(err) {
      console.log('FIND LISTING BY ID ERROR' + err);
    } else {
      callback(data);
    }
  });
};

exports.getAllListings = function(callback) {
  Listing.find({}, (err, listings) => {
    if (err) {
      console.log('GET ALL LISTINGS ERROR' + err);
    } else {
      callback(listings);
    }
  })
};


