var Listing = require('../database/models/Listing');

/* 
to seed database: go to file and run node listing-seeder.js
*/

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

let storageArr = [];
//create array of messages data
  for (let i = 0; i < 100; i++) {
    storageArr.push(new Listing({
      id: i,
      listing_name: randomListing(),
      host_name: randomHostName(),
      listing_price: randomPrice()
    }));
};

Listing.deleteMany({}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('database cleared');
    Listing.insertMany(storageArr, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('database seeded!') 
        Listing.find({}, (err, result) => {
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
