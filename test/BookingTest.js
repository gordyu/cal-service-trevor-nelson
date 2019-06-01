var expect = require('chai').expect;
var mongoose = require('mongoose');
var Booking = require('../database/db.js');

describe('Booking Model', function () {

  it('Booking should be a Mongoose model', function () {
    expect(new Booking()).to.be.instanceOf(mongoose.Model);
  });

  it('should have a schema', function () {
    expect(Booking.schema).to.exist;
  });


});
