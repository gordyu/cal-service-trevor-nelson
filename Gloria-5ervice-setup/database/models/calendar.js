var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
  month: {type: Number, required: true}, //3 months
  day: {type: Number, required: true} //31
});


module.exports = mongoose.model('Calendar', schema);