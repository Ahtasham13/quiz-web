const express = require("express");
const app = express();

// Middleware to parse request body as JSON
app.use(express.json());

// Sample data - replace this with an actual database or data storage
let books = [
  {
    id: 0,
    title: "Sample Book 1",
    author: "John Doe",
  },
];

// GET all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// POST book
app.post("/api/books", (req, res) => {
  const { title, author } = req.body;

  // Error handling for missing data
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and Author are required.' });
  }

  // Generate a unique ID for the new book (In a real app, you may use a database auto-increment ID)
  const newBookId = books.length;

  // Create a new book object
  const newBook = { id: newBookId, title, author };

  // Add the new book to the array
  books.push(newBook);

  // Respond with the new book data
  res.status(201).json(newBook);
});

// PUT book
app.put("/api/books/:id", (req, res) => {
  const bookId = req.params.id;

  // Find the index of the book with the given ID in the 'books' array
  const bookIndex = books.findIndex((book) => book.id == bookId);

  // Check if the book with the given ID exists
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found.' });
  }

  // Assuming the client sends JSON data in the request body with keys: "title" and "author"
  const { title, author } = req.body;

  // Error handling for missing data
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and Author are required.' });
  }

  // Update the book's information
  books[bookIndex].title = title;
  books[bookIndex].author = author;

  // Respond with the updated book data
  res.json(books[bookIndex]);
});

// DELETE book
app.delete("/api/books/:id", (req, res) => {
  const bookId = req.params.id;

  // Find the index of the book with the given ID in the 'books' array
  const bookIndex = books.findIndex((book) => book.id == bookId);

  // Check if the book with the given ID exists
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found.' });
  }

  // Remove the book from the array
  books.splice(bookIndex, 1);

  // Respond with a success message
  res.json({ message: 'Book removed successfully.' });
});

// GET one book
app.get("/api/books/:id", (req, res) => {
  const bookId = req.params.id;

  // Find the book with the given ID in the 'books' array
  const book = books.find((book) => book.id == bookId);

  // Check if the book with the given ID exists
  if (!book) {
    return res.status(404).json({ error: 'Book not found.' });
  }

  // Respond with the book's information
  res.json(book);
});

module.exports = app;
