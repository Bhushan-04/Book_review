const express = require('express');
const router = express.Router();
const { addBook, getBooks, getBookDetails, searchBooks } = require('../controllers/Bookcontroller/bookController');
const authenticate = require('../middleware/authMiddleware');

// Add a new book (authenticated)
router.post('/', authenticate, addBook);

// Get all books with pagination and optional filters
router.get('/', getBooks);


// Search books by title or author
router.get('/search', searchBooks);

// Get book details with reviews
router.get('/:id', getBookDetails);



module.exports = router;
