var Booking = require('../models/booking');

var generate = () => {
  let entry = {}
  entry.type = types[Math.floor(Math.random() * types.length)]

  entry.description = descriptions[Math.floor(Math.random() * descriptions.length)]

  entry.tags = tags[Math.floor(Math.random() * tags.length)]

  entry.price = Math.floor(Math.random() * (1000+ 50) + 50)

  entry.location = locations[Math.floor(Math.random() * locations.length)]

  entry.image = images[Math.floor(Math.random() * images.length)]

  entry.rating = ratings[Math.floor(Math.random() * ratings.length)]

  entry.numRatings = Math.floor(Math.random() * (1000+ 50) + 50)

  return entry
}

// destroy all previous records in the target DB

//generate 100 random records from the chunks of dummy data collected above
let seedData = []

for(let i = 0; i < 100; i++) {
  seedData.push(generate())
}

//delete old data and insert genereated data into database

Home.deleteMany({}, (err) => {
  if(err) {
    console.log(err)
  } else {
    console.log('database cleared')
    Home.insertMany(seedData, (err) => {
      if(err){
        console.log(err)
      } else {
        console.log('database seeded')
        Home.find({}, (err, result) => {
          if(err){
            console.log(err)
          } else {
            console.log(result)
          }
        })
      }
    })
  }
})

///////////////////////////
