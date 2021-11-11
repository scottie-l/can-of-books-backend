'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const book = require('./book.js');
// const getBooks = require('./bookRoute.js');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('Error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('mongoose is connected');
})

const PORT = process.env.PORT || 3001;

async function getBooks(req, res) {
  let request = req.query;
  console.log(req.body);
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

async function createBook (req, res) {
  console.log(req.body);
  try {
    let newBook = await book.create(req.body);
    res.status(201).send(newBook);
  } catch(e) {
    res.status(400).send('Book not added');
  }
}

async function deleteBook (req, res) {
  const id = req.params.id;
  const email = req.query.email;
  console.log(req.params.id)
  try {
    let deleteBook = await book.find({_id: req.params.id});
    console.log(deleteBook[0].email);
    console.log(email);
    if (deleteBook[0].email === email) {
      console.log('gonna delete');
      await book.deleteOne({_id: req.params.id}) 
      res.status(204).send('Book deleted');
    }
  } catch(e) {
    res.status(400).send('Book not deleted');
  }
}

async function updateBook (req, res) {
  const id = req.params.id;
  const email = req.query.email;
  const bookData = req.body;
  console.log(id, email, bookData);
  try {
    let updateBook = await book.findByIdAndUpdate(id, bookData, {new: true});
    res.status(200).send(updateBook);
  } catch (e) {
    res.status(400).send('Book not updated');
  }
} 

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/books', getBooks);
app.post('/books', createBook);
app.delete('/books/:id', deleteBook);
app.put('/books/:id', updateBook);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
