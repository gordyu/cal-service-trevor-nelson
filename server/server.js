const express = require('express');
const db = require('../database/db.js');
// const seeder = require('../database/seeder.js');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));
app.use('/', express.static(`${__dirname}/../public`));




//listing (main) routes - - - - - -- - - - - - -- - - - - - -- - - - - - -- - - - - - -- 
app.post('/', (req, res) => {
  var newListing = req.body;
  db.createListing(newListing, (err, data) => {
    if(err) console.log("error in app.POST (main)") , res.status(404).send('failure!')
    else console.log('sucessful listing post') , res.status(200).send([data.id, data._id])
  })
})

app.put('/:listingId', (req, res) => {
  db.editListing(req.params.listingId, req.body, (err, data) => {
    if(err) console.log("error in app.PUT (main)") , res.status(404).send('failure!')
    else console.log('sucessful edit of listing post') , res.status(200).send(data)
  })
})

app.get('/:listingId', (req, res) => {
  db.serveListing(req.params.listingId, (err, data) => {
    if (err) console.log('error with serving listing', err);
    else {
      res.send(data);
    } 
  });
});
app.delete('/:listingId',  (req, res) => {
  db.removeListing(req.params.listingId, (err, data) => {
    if(err) console.log("error in app.DELETE (main)") , res.status(404).send('failure!')
    else console.log('sucessful deleting post') , res.status(200).send(data)
  })
})
// - -  - - -- - - - - - -- - - - - - -- - - - - - -- - - - - - --  - - - - -- - - - - - -



//booking (dates) routes - - - - - -- - - - - - -- - - - - - -- - - - - - -- - - - - - -- 
app.post('/booking/:listingId', (req, res) => {

})

app.put('/booking/:listingId/:bookingId', (req, res) => {

})

app.get('/booking/:listingId/:bookingId', (req, res) => {

});

app.delete('/booking/:listingId/:bookingId',  (req, res) => {

})
// - -  - - -- - - - - - -- - - - - - -- - - - - - -- - - - - - --  - - - - -- - - - - - -



const port = 3002;
const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

setTimeout(() => server, 5000);




module.exports = server;