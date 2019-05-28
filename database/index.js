const mongoose = require('mongoose');
// var Listing = require('../models/listing');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true })
        .then(() => console.log('MongoDB connected!'))
        .catch(err => console.log('error'));
var Schema = mongoose.Schema;

let listing = new Schema({
  id: {type: Number, required: true},
  listing_name: {type: String, required: true},
  host_name: {type: String, required: true},
  listing_price: {type: Number, required: true}
});


let Listing = mongoose.model('Listing', listing);
module.exports = Listing;
