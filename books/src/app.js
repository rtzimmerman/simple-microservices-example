const express = require('express');
const Book = require('./models/book_model')
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ msg: 'books' });
});

app.get('/api/v1/books', async (req, res) => {
    const books = await Book.find({});
    console.log('getting those books');
    res.json(books);
});

app.post('/api/v1/books', async (req, res) => {
    const book = new Book({ name: req.body.name });
    const savedBook = await book.save();
    res.json(savedBook);
});

module.exports = app;