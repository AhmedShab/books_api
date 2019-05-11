function booksController(Book) {
  function post(req, res) {
    const book = new Book(req.body);
    book.save();
    return res.status(201).send(book);
  }

  function get(req, res) {
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
  }
  return { post, get };
}

module.exports = booksController;
