const express = require('express');


function routes(Book) {
  const bookRouter = express.Router();
  bookRouter.route('/book')
    .post((req, res) => {
      const book = new Book(req.body);
      book.save();
      return res.status(201).send(book);
    });

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
  return bookRouter;
}

module.exports = routes;
