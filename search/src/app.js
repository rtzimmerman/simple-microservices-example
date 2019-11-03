const express = require('express');
const fetch = require('node-fetch');
const Video = require('./models/video_model');
const Book = require('./models/book_model');
const app = express();

app.get('/search', (req, res) => {
    res.json({ searchResults: 'no results' });
});

app.get('/api/v1/search', async (req, res) => {
    const videosPromise = Video.find({});
    const booksPromise = Book.find({});
    const promises = [videosPromise, booksPromise];
    const [videos, books] = await Promise.all(promises);

    res.json(videos.concat(books));
});

app.get('/api/v1/search/depends-on', async (req, res) => {
    try {
       const videoPromise = fetch('http://videos:3000/');
       const bookPromise = fetch('http://books:3000/');
       const promises = [videoPromise, bookPromise];
       const [videoResponse, bookResponse] = await Promise.all(promises);
       const videoJson = videoResponse.json();
       const bookJson = bookResponse.json();
       
       res.json({video: videoJson, book: bookJson });
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = app;