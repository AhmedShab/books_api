const express = require('express');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/bookAPI', { useNewUrlParser: true });
const port = process.env.PORT || 3000;
const bookRouter = express.Router();
const Book = require('./models/bookModel');

bookRouter.route('/books')
  .get((req, res) => {
    const query = {};
    if (req.query.genre) {
      query.genre = query.genre;
    }
    Book.find(query, (error, books) => {
      if (error) {
        return res.send(error);
      }
      return res.json(books);
    });
  });

bookRouter.route('/books/:bookId')
  .get((req, res) => {
    Book.findById(req.params.bookId, (error, books) => {
      if (error) {
        return res.send(error);
      }
      return res.json(books);
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my api');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
