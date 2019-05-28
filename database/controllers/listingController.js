var Listing = require('../models/Listing');

exports.createListing = function(newListing, callback) {
  var newListing = new Listing({
    id: newListing.id,
    listing_name: newListing.listing_name,
    host_name: newListing.host_name,
    listing_price: newListing.listing_price
  });

  newListing.save({}, callback);
};

exports.findListingByName = function(name, callback) {
  Listing.findOne({'listing_name': listing_name}, (err, data) => {
    if(err) {
      console.log(err);
    } else {
      callback(data);
    }
  });
};

exports.getAllListings = function(callback) {
  Listing.find(function(err, listings) {
    if (err) {
      console.log(err)
    } else {
      console.log('success', listings);
      callback(listings);
    }
  })
}