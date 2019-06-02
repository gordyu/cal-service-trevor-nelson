var expect = require('chai').expect;
var mongoose = require('mongoose');
var Listing = require('../database/db');

describe('Listing Model', function () {

  it('Listing should be a Mongoose model', function () {
    expect(new Listing()).to.be.instanceOf(mongoose.Model);
  });

  it('should have a schema', function () {
    expect(Listing.schema).to.exist;
  });


});
