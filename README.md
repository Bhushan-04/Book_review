## Book Review API
  
  A RESTful API for managing books and reviews along with protected routes, built with Node.js, Express, Sequelize, and PostgreSQL. Includes JWT-based authentication and full CRUD functionality for books and reviews.

### Features

# User Authentication (JWT)

Signup: /auth/signup

Login: /auth/login

# Books

Add book (authenticated): POST /books

Get all books with pagination & filters: GET /books

Get book details with average rating & paginated reviews: GET /books/:id

Search books by title or author: GET /books/search?query=

# Reviews

Add review (authenticated, one per user per book): POST /books/:id/reviews

Update own review: PUT /reviews/:id

Delete own review: DELETE /reviews/:id