var Calendar = require('../models/calendar');
var mongoose = require('mongose');
mongoose.connect('localhost:3002/booking'); //???

var calendars = [
    new Calendar({
        month: 1,
        day: 1
    }),
    new Calendar({
      month: 1,
      day: 2
    }),
    new Calendar({
      month: 1,
      day: 3
    }),
    new Calendar({
      month: 1,
      day: 4
    }),
    new Calendar({
      month: 1,
      day: 5
    }),
    new Calendar({
      month: 1,
      day: 6
    }),    
    new Calendar({
      month: 1,
      day: 7
    })
];

//mongo will not be connected to this application -- seeder not running all the time during run time (not normal part); need to manually run file in nodejs

var done = 0;

for (var i = 0; i < calendars.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if (done === calendars.length) {
      exit();
    }
  }); //saves model to db - creates new collection
}

function exit() {
  mongoose.disconnect();
}

//saving is asynchronous, will start loop when initiate saving and will continue disconnecting -- chances will disconnect before done saving. need to disconnect in a callback after creating a 'done'
  //need done otherwise will discconnect after each object
  //in callback of each save operation, increment done by one and check if done is equal to product length (need to increment first, length doesn't start at 0), then you know you're done and can exit.

//mongoose.disconnect();

//navigate to mongodb binary folder
//look into db use booking
//db.calendars.find()

//output those items on index view