const mongoose = require('mongoose');
require ('dotenv').config();
const book = require('./book.js');

async function buildBook() {
    mongoose.connect(process.env.DB_URL);

    await book.create({
        title: 'My First Book',
        description: 'There are only 5 words', 
        status: true,
        email: 'JimBob22@yahoo.com'
    })
    console.log('adds my first book');

    await book.create({
        title: 'My Left Foot',
        description: 'Dude can only move left foot', 
        status: true,
        email: 'CoooolDude12@hotmail.com'
    })
    console.log('adds my left foot');

    await book.create({
        title: 'My eyes',
        description: 'I have seen it all', 
        status: true,
        email: 'Theone99@matrix.com'
    })
    console.log('adds my eyes');

    mongoose.disconnect();
}

buildBook();
