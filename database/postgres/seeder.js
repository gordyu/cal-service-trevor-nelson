const listings = require('./seed-bnblist.js');
const bookings = require('./seed-bookings')


async function createListings() {
	listings();
}


createListings().then(meh => {
		bookings()
})

