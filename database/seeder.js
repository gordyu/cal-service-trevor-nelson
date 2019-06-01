var db = require('../database/models/Booking');


let bookingMap = {};
let j = 0;

for (let i = 0; i < 100; i++) {
  let storageArr = [];
  storageArr.push(new db.Booking(
    {
      record: j++,
      listing_id: i,
      booking_start: '2019-05-01',
      booking_end: '2019-05-03'
  }));

  storageArr.push(new db.Booking(
    {
      record: j++,
      listing_id: i,
      booking_start: '2019-05-08',
      booking_end: '2019-05-11'
  }));

  storageArr.push(new db.Booking(
    {
      record: j++,
      listing_id: i,
      booking_start: '2019-05-14',
      booking_end: '2019-05-18'
  }));

  storageArr.push(new db.Booking(
    {
      record: j++,
      listing_id: i,
      booking_start: '2019-05-24',
      booking_end: '2019-05-26'
  }));

  storageArr.push(new db.Booking(
    {
      record: j++,
      listing_id: i,
      booking_start: '2019-05-28',
      booking_end: '2019-05-29'
  }));

  storageArr.push(new db.Booking(
    {
      record: j++,
      listing_id: i,
      booking_start: '2019-06-04',
      booking_end: '2019-06-09'
  }));
  
  storageArr.push(new db.Booking(
    {
      record: j++,
      listing_id: i,
      booking_start: '2019-06-17',
      booking_end: '2019-06-25'
  }));

  storageArr.push(new db.Booking(
    {
      record: j++,
      listing_id: i,
      booking_start: '2019-07-10',
      booking_end: '2019-07-15'
  }));

  storageArr.push(new db.Booking(
    {
      record: j++,
      listing_id: i,
      booking_start: '2019-07-19',
      booking_end: '2019-07-22'
  }));

  storageArr.push(new db.Booking(
    {
      record: j++,
      listing_id: i,
      booking_start: '2019-07-24',
      booking_end: '2019-07-30'
  }));

  // let curId = i.toString();
  // bookingMap[curId] = storageArr;

  bookingMap[i.toString()] = storageArr;
};

const randomElement = function(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
//create random username
const names = ['Linda', 'Bob', 'Maira', 'Jade', 'Gloria', 'Joan', 'Mike', 'Jessie', 'Taylor', 'Ronald', 'Tiffany', 'Leon', 'Johanna', 'Leslie', 'Courtney', 'Scott', 'Jerry', 'Edmundo', 'Zachary', 'Alfred', 'Cam', 'Sarkis', 'Robin', 'Cody', 'Hailey', 'Kyle', 'Chris'];

//way to create randomly generated reviews
const adjectives = [
  'Beautiful',
  'Sunny',
  'Abysmal',
  'Haunting',
  'Neo-Classical',
  'Wonderful',
  'Artsy',
  'Horrific',
  'Cold and Decrepit',
  'Modern',
  'Comfortable',
  'Memorable',
  'Rustic',
  'Whimsical',
  'Quaint',
  'Modest',
  'Dated',
  'Overpriced',
  'Coveted'
];

const nouns = [
  'underwater dome',
  'yurt',
  'garage',
  'puebla',
  'living-room space',
  'infinity pool',
  'horse-and-carriage',
  'backyard',
  'regrigerator box',
  'communal living space',
  'co-op',
  'lightly-used sofa',
  'home',
  'mansion',
  'penthouse suite',
  'apartment',
  'hyperbolic chamber',
  'duplex',
  'condo',
  'guest house'
];

const verbs = [
  'in',
  'around',
  'by',
  'next to',
  'located in',
  'in the heart of',
  'in the middle of',
  'located near',
  'within a stone\'s throw of',
  'in walking distance of',
  'near',
  'close to',
  'underneath'
];

const locations = [
  'a busy cross-section',
  'outerspace',
  'underwater',
  'downtown',
  'the countryside',
  'the Upside-Down',
  'the shadowrealm',
  'a virtual world',
  'an alternate reality',
  'my grandmother\'s house',
  'the woods',
  'Hogwart\'s',
  'Candyland',
  'the Wall',
  'the Red Keep',
  'the public park',
  'the Cow level',
  'Kanto',
  'Mars'
];

let randomListing = function(){
  return [randomElement(adjectives), randomElement(nouns), randomElement(verbs), randomElement(locations)].join(' ');
};
let randomHostName = function(){
  return randomElement(names);
}

let randomPrice = function() {
  return Math.floor(Math.random() * (1000+ 50) + 50);
}

let randomMaxGuests = function() {
  return Math.floor(Math.random() * (5))
}

let storageArr = [];
//create array of messages data
  for (let i = 0; i < 100; i++) {
    storageArr.push(new db.Listing({
      id: i,
      listing_name: randomListing(),
      host_name: randomHostName(),
      max_guests: randomMaxGuests(),
      reservations: bookingMap[i],
      listing_price: randomPrice()
    }));
};
//create listing schemas
//set reseravations to null or empty array
//for loop start creating all bookings
  //at end of each separate booking push into listing schema


db.Booking.deleteMany({}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('database for bookings cleared');
    db.Booking.insertMany(storageArr, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('bookings seeded!') 
        db.Booking.find({}, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            // console.log(result);
          }
        });
      }
    });
  }
});

db.Listing.deleteMany({}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('database for listings cleared');
    db.Listing.insertMany(storageArr, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('listings seeded!') 
        db.Listing.find({}, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            //console.log(result);
          }
        });
      }
    });
  }
});
