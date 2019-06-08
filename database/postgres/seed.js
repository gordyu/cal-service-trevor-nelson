const fs = require('fs')
const path = require('path')
const {AsyncParser} = require('json2csv')
const faker = require('faker')

const db = require("./db.js")
const words = require("./resources/airbnbwords.js")
const seedFilePath = "./SeedSilo/seedFile.txt"

var adjectivesLength = words.adjectives.length;
var homesLength = words.homes.length
var proximityLength = words.proximity.length
var nearbyLength = words.nearby.length
var headers = "listing_name\thost_name\tmax_guests\tlisting_price\n"

var numSeeds = 10000000
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
// console.log(objCreate())
	


fs.writeFile(path.join(__dirname ,seedFilePath), "", 'utf8', (err, data) => {
	if(err) console.error(err)
	else {
	fs.open(path.join(__dirname ,seedFilePath), 'r+', (err, fd) => {
		if(err) console.error(err)
		else {
		console.log('------------------------------------');
		console.log('Opened file @' + Date());
		console.log('------------------------------------');
		
		const recurser = (n) => {
			if(n>numSeeds ) {
				console.log('------$-------------$----------$-------');
				console.log('FileWrite complete @' + Date());
				console.log('--$-----------$-------------$---------$-');
				return;
			}
			if(n === 0) {
			fs.write(fd, headers, (err) => {
				if(err) console.error(err)
				recurser(n+1)
			})
		} else {
			var {listing_name, host_name, max_guests, listing_price} = objCreate(n);
			var inputString = `${listing_name}\t${host_name}\t${max_guests}\t${listing_price}\n`
			fs.write(fd, inputString, (err) => {
				if(err) console.error(err)
				recurser(n+1)
			})
		}
		
		}
		recurser(0)
		}
			
	})
}
})



		// seed = JSON.stringify(seed)

		// for(let i = 0; i<9000000; i++){
			
		
		// 			string += `"${seedObj['listing_name']}","james franko",24,239\n`
		// }
		// for(let i = 0; i<5; i++){
		// 	string2 += `"Trevors treehouse of magic vacations","James Franko",24,239\n`
		// }
	
		// fs.writeFile(path.join(__dirname, seedFilePath), (string + string2),'utf8', (err )=> {
		// 	if(err) console.error(err)
		// 	console.log('DONEZO!')
		// })
	
			// asyncParser.input.push(string)
		

	  // // asyncParser.input.push(
		// // {"listing_name": "Trevors treehouse of magic vacations","host_name": "James Franko","max_guests": 24,"listing_price": 239}`);

		// }
		// 	asyncParser.input.push(string2)
	





	// string += `"BEAUTIFUL ${words.homes[i%homesLength] +" "+ words.proximity[i%proximityLength] +" "+ words.nearby[i%nearbyLength] }","james franko",24,239\n`
			// string += `"Trevors treehouse of magic vacations","James Franko",24,239\n`
				// string += `"BEAUTIFUL ${words.homes[i%homesLength] +" "+ words.proximity[i%proximityLength] +" "+ words.nearby[i%nearbyLength] }","james franko",24,239\n`