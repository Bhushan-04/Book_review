const express = require('express');
const router = express.Router();
const { addReview, updateReview, deleteReview } = require('../controllers/Reviewcontroller/reviewController');
const authenticate = require('../middleware/authMiddleware');

// Add review to a book
router.post('/books/:id/reviews', authenticate, addReview);

// Update review
router.put('/reviews/:id', authenticate, updateReview);

// Delete review
router.delete('/reviews/:id', authenticate, deleteReview);

module.exports = router;
