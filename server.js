'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const book = require('./book.js');
// const getBooks = require('./bookRoute.js');




const app = express();
app.use(cors());

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('Error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('mongoose is connected');
})

const PORT = process.env.PORT || 3001;

async function getBooks(req, res) {
  let request = req.query;
  if (request) {
      try {
          let booksFromDB = await book.find({});
          if (booksFromDB) {
              res.status(200).send(booksFromDB);
          } else {
              res.status(404).send('Sorry no books');
          }
      }
      catch(e) {
          console.log(e.response);
          res.status(500).send('Server Failure');
      }
  }
}

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/books', getBooks);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
