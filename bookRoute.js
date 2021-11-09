const Mongoose = require('mongoose');
require('dotenv').config();
const book = require('./book.js');

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

module.exports = getBooks;
