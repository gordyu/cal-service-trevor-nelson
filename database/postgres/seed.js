const fs = require('fs')
const path = require('path')
const {AsyncParser} = require('json2csv')

const db = require("./db.js")
const seedFilePath = "./SeedSilo/seedFile.csv"

//setting up async parser
// const feilds = ["listing_name", "host_name", "max_guests", "listing_price"]
// const opts = { feilds }
// const transformOpts = {highWaterMark: 8192}
// const asyncParser = new AsyncParser(opts, transformOpts)
// let csv = ''
//- - - - - - - 


// asyncParser.processor
// 	.on('data', chunk => {
// 		return (csv += chunk.toString())
// 	})
// 	.on('end', ()=> {
// 		console.log('------------------------------------');
// 	 fs.writeFile(path.join(__dirname, seedFilePath), csv,'utf8', ()=> {console.log('doneWriting CSV file')})
// 		console.log('------------------------------------');
// 	})
// 	.on('error', err => console.error(err))



	var seed = {
		"listing_name": "Trevors treehouse of magic vacations",
		"host_name": "James Franko",
		"max_guests": 24,
		"listing_price": 239
		}
		// {
		// 	"listing_name": "the FOREST cabin",
		// 	"host_name": "Brandy Nelson",
		// 	"max_guests": 4,
		// 	"listing_price": 209
		// 	}]
var string2
var string = `listing_name","host_name","max_guests","listing_price"\n`
		// seed = JSON.stringify(seed)
		for(let i = 0; i<5000000; i++){
			string += `"Trevors treehouse of magic vacations","James Franko",24,239\n`
		}
		for(let i = 0; i<5000000; i++){
			string2 += `"listing_name","host_name","max_guests","listing_price""Trevors treehouse of magic vacations","James Franko",24,239\n`
		}
	
		fs.writeFile(path.join(__dirname, seedFilePath), (string + string2),'utf8', (err )=> {
			if(err) console.error(err)
			console.log('wrote first half of csv')
			console.log('done!')
		})
	
			// asyncParser.input.push(string)
		

	  // // asyncParser.input.push(
		// // {"listing_name": "Trevors treehouse of magic vacations","host_name": "James Franko","max_guests": 24,"listing_price": 239}`);

		// }
		// 	asyncParser.input.push(string2)
	
		console.log('------------------------------------');
		// console.log(string.length);
		console.log('------------------------------------');
		// asyncParser.input.push(null);




// const seedFile = require(seedFilePath)




// fs.writeFileSync(path.join(__dirname, seedFilePath), csv ,'utf8')



// console.log(JSON.stringify(seed)) 