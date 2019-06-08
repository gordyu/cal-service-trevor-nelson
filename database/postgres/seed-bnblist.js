const fs = require('fs')
const path = require('path')
const faker = require('faker')
const db = require("./db.js")
 


// LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS 
// LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS 
// LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS 
// LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS 


const words = require("./resources/airbnbwords.js")
const seedFilePath = path.join(__dirname ,"./SeedSilo/seedFileListings.tsv")
// LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS 
var adjectivesLength = words.adjectives.length;
var homesLength = words.homes.length
var proximityLength = words.proximity.length
var nearbyLength = words.nearby.length

// LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS 
var numSeeds = 1000000
// var numSeeds = 4
const objCreate = (i) => {
	var seedObj = {
		"listing_name": `${words.adjectives[i%adjectivesLength]} ${words.homes[i%homesLength]} ${words.proximity[i%proximityLength]} ${words.nearby[i%nearbyLength]}`,
		"host_name": faker.name.findName(),
		"max_guests": 2+ Math.floor(Math.random() * 10),
		"listing_price": 52+ Math.floor(Math.random() * 500)
		}
		return seedObj;
}
// LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS 
	
// LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS 
module.exports = function() {
		fs.writeFile(seedFilePath, "", 'utf8', (err, data) => {
			if(err) console.error(err)
			else {
			fs.open(seedFilePath, 'r+', (err, fd) => {
				if(err) console.error(err)
				else {
				console.log('------------------------------------');
				console.log('Opened file for LISTINGS @' + Date());
				console.log('------------------------------------');
				// LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS 
				const recurser = (n) => {
					if(n>numSeeds ) {
						console.log('------$-------------$----------$-------');
						console.log('FileWrite complete for LISTINGS @' + Date());
						console.log('--$-----------$-------------$---------$-');
					return db.dbLoader('bnblist', seedFilePath, (err, data)=> {
							if(err) console.error(err)
							else {
								console.log('-!------!---!-------!-----!----!-------!--');
								console.log("..............Loaded LISTINGS into DB sucessfully @ " + Date())
								// LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS 
								console.log('----!--!----!----!- - - - !---!--!----!----!--');
								return; 
							}
						})
					}
					// LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS 
					var {listing_name, host_name, max_guests, listing_price} = objCreate(n);
					var inputString = `${n}\t${listing_name}\t${host_name}\t${max_guests}\t${listing_price}\n`
					fs.write(fd, inputString, (err) => {
						if(err) console.error(err)
						recurser(n+1)
					})
				}
				recurser(0)
				}
					
			})
		}
		})

// LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS LISTINGS 
}