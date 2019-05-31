const db = require('./db');

const randomNumber = (min, max) => Math.floor(Math.random() * Math.floor(max)) + min;

const sequentialDate = (next) => {
  const today = new Date();
  today.setDate(today.getDate() + next);
  let day = today.getDate();
  if (day < 10) day = `0{day}`;
  let month = today.getMonth();
  if(month < 10) month = `0${month}`;
  const year = today.getFullYear();
  return `${year}-${month}-${day}`;
};


var randomBooking = () => {
  console.log('UMM HELLO EVERYONE')
  let listings = 100;
  let record = 0;
  while (listings > 100) {
    const listingReservation = new db.Listing({ id: listings });
    let daysAhead = 0;
    const maxGuests = randomNumber(1, 6);
    while (daysAhead < 90) {

    const currentBooking = {};
    currentBooking.record = record;
    currentBooking.listing_id = listings;
    currentBooking.max_guests = maxGuests;
    currentBooking.total_price = randomNumber(5, (maxGuests * 2));
    currentBooking.date = sequentialDate(daysAhead);

    const reservation = new db.Booking(currentBooking);
    listingReservation.listings.push(reservation);
    console.log('LISTING RESERVATION IS' + listingReservation)
    daysAhead += 1;
    record += 1;
    db.save(listingReservation);
    listings -= 1;
  }
  console.log('UMM  EVERYONE')

}
randomBooking();

module.exports.randomBooking = randomBooking;
}
