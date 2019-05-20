const mongoose = require('mongoose');
// var Listing = require('../models/listing');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true })
        .then(() => console.log('MongoDB connected!'))
        .catch(err => console.log('error'));
// var Schema = mongoose.Schema;

let listingSchema = mongoose.Schema({
  id: {type: Number, required: true},
  listing_name: {type: String, required: true},
  host_name: {type: String, required: true},
  listing_price: {type: Number, required: true}
});

// let listingSchema = new mongoose.Schema({
//   id: {type: Number, required: true},
//   listing_name: {type: String, required: true},
//   host_name: {type: String, required: true},
//   listing_price: {type: Number, required: true}
// });

let Listing = mongoose.model('Listing', listingSchema);
module.exports.Listing = Listing;





//SAVE AND PARSE FUNCTION FOR SCHEMA
// let save = (listingObj) => {
  
//   var listingArr = [];
//   var parsedListings = JSON.parse(listingObj.body); //array of individual listings

//   for (var i = 0; i < parsedlistings.length; i++) {
//     var listingObj = {};

//     listingObj.id = parsedlistings[i].id;
//     listingObj.listing_name = parsedListings[i].listing_name;
//     listingObj.host_name = parsedListings[i].host_name;
//     listingObj.listing_price = parsedListings[i].listing_price;

//     var listing = new Listing(listingObj); //new document

//     listing.save(function(err) {
//       if (err) {
//         console.log(err);
//       }
//     });

//     listingArr.push(listingObj);
//   }
//   console.log('final product of save', listingArr);

// }

// let fetch = function(callback) {
//   Listing.find(function(err, listings) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('>>>>>>>', listings);
//       callback(listings);
//     }
//   });
// }



// module.exports = mongoose.model('Listing', listingSchema);
// module.exports.save = save;


// module.exports.save = save;
// module.exports.fetch = fetch;