const { Book, Review, User } = require('../../models');
const { Op } = require('sequelize');

// POST /books - Add a new book (authenticated)
const addBook = async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }

    const book = await Book.create({ title, author, genre, description });

    return res.status(201).json({ message: 'Book added successfully', book });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// GET /books - Get all books with pagination & optional filters
const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { author, genre } = req.query;

    const where = {};
    if (author) where.author = { [Op.iLike]: `%${author}%` };
    if (genre) where.genre = { [Op.iLike]: `%${genre}%` };

    const { count, rows } = await Book.findAndCountAll({
      where,
      offset: (page - 1) * limit,
      limit,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Review,
          as: 'reviews',
          attributes: ['id', 'rating', 'comment', 'userId', 'createdAt'],
        },
      ],
    });

    return res.json({
      total: count,
      page,
      pages: Math.ceil(count / limit),
      books: rows,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


// GET /books/:id - Book details with average rating and paginated reviews
const getBookDetails = async (req, res) => {
  try {
    const bookId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const book = await Book.findByPk(bookId, {
      include: [
        {
          model: Review,
          as: 'reviews',
          include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }],
          offset: (page - 1) * limit,
          limit,
          order: [['createdAt', 'DESC']],
        },
      ],
    });

    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Calculate average rating
    const reviews = await Review.findAll({ where: { bookId } });
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : null;

    return res.json({
      book,
      averageRating,
      reviewsCount: reviews.length,
      page,
      pages: Math.ceil(reviews.length / limit),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


// GET /search?query=keyword - Search books by title or author
const searchBooks = async (req, res) => {
  try {
    const query = req.query.query;
    console.log(query);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!query) return res.status(400).json({ message: 'Query parameter is required' });

    const { count, rows } = await Book.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { author: { [Op.iLike]: `%${query}%` } },
        ],
      },
      offset: (page - 1) * limit,
      limit,
      order: [['createdAt', 'DESC']],
    });

    return res.json({
      total: count,
      page,
      pages: Math.ceil(count / limit),
      books: rows,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { addBook, getBooks, getBookDetails, searchBooks };
