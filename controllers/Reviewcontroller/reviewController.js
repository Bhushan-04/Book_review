const { Review, Book } = require('../../models');

// POST /books/:id/reviews - Add a review (authenticated, one per user per book)
const addReview = async (req, res) => {
  try {
    const userId = req.userId;
    const bookId = req.params.id;
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if book exists
    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ where: { bookId, userId } });
    if (existingReview) return res.status(400).json({ message: 'You have already reviewed this book' });

    const review = await Review.create({ bookId, userId, rating, comment });

    return res.status(201).json({ message: 'Review added', review });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// PUT /reviews/:id - Update own review
const updateReview = async (req, res) => {
  try {
    const userId = req.userId;
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    const review = await Review.findByPk(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId !== userId) return res.status(403).json({ message: 'Forbidden' });

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();
    return res.json({ message: 'Review updated', review });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /reviews/:id - Delete own review
const deleteReview = async (req, res) => {
  try {
    const userId = req.userId;
    const reviewId = req.params.id;

    const review = await Review.findByPk(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId !== userId) return res.status(403).json({ message: 'Forbidden' });

    await review.destroy();
    return res.json({ message: 'Review deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addReview, updateReview, deleteReview };
