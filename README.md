# Book Review API

A RESTful API for managing books and reviews, built with **Node.js**, **Express**, **Sequelize**, and **PostgreSQL**. Includes JWT-based authentication and full CRUD functionality for books and reviews.

## Features

- **User Authentication** (JWT)
  - Signup: `/auth/signup`
  - Login: `/auth/login`
- **Books**
  - Add book (authenticated): `POST /books`
  - Get all books with pagination & filters: `GET /books`
  - Get book details with average rating & paginated reviews: `GET /books/:id`
  - Search books by title or author: `GET /books/search?query=`
- **Reviews**
  - Add review (authenticated, one per user per book): `POST /books/:id/reviews`
  - Update own review: `PUT /reviews/:id`
  - Delete own review: `DELETE /reviews/:id`

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT for authentication
- bcrypt for password hashing
- dotenv for environment variables

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Bhushan-04/Book_review.git
cd Book_Review
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root:

```
DATABASE_URL=postgres://postgres:mypass123@127.0.0.1:5432/mydb
JWT_SECRET=supersecretkey123
JWT_EXPIRES_IN=1d
```

> **Note:** `.env` is ignored by Git via `.gitignore`.

### 4. Setup Database

1. Make sure **PostgreSQL** is running locally.
2. Create database `mydb` using **pgAdmin** or `psql`:

```sql
CREATE DATABASE mydb;
```

3. Run Sequelize migrations to create tables if want to create migrations or else sync

```bash
npx sequelize-cli db:migrate
```

Tables created: `Users`, `Books`, `Reviews`.

### 5. Start the server before that add "dev": "nodemon app.js" in package.json

```bash
npm run dev
```

Server should run on `http://localhost:3000`.


## API Endpoints

### Auth

#### Signup

```http
POST /auth/signup
Content-Type: application/json

{
  "name": "modric sancho",
  "email": "sancho@example.com",
  "password": "mypassw"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "sancho@example.com",
  "password": "mypassw"
}

this will return bearer token (required for authorization)
```

**Response:**

```json
{
  "token": "jwt-token"
}
```

---

### Books

#### Add a Book (authenticated)

```http
POST /books
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Vyakti ani veli",
  "author": "pu la deshpande",
  "genre": "Fiction",
  "description": "great novel"
}
```

#### Get All Books with Pagination & Filters

```http
GET /books?page=1&limit=10&author=deshpande&genre=Fiction
```

#### Get Book Details (with average rating & paginated reviews)

```http
GET /books/1?page=1&limit=5
```

#### Search Books

```http
GET /books/search?query=deshpande&page=1&limit=5
```


### Reviews

#### Add a Review (authenticated, one per book)

```http
POST /books/1/reviews
Authorization: Bearer jwt-token
Content-Type: application/json

{
  "rating": 5,
  "comment": "Amazing book!"
}
```

#### Update Review (authenticated)

```http
PUT /reviews/1
Authorization: Bearer jwt-token
Content-Type: application/json

{
  "rating": 4,
  "comment": "Changed my mind, still great!"
}
```

#### Delete Review (authenticated)

```http
DELETE /reviews/1
Authorization required
```


## Notes & Design Decisions

- As for now , routes are directly added on index page only which is not standardise way to do it but it was mini project so i kept it there.
- routes also can be nested inside folder according to industry practice

## Diagram which has 1:N relation
![Diagram](/public/er.png)

## Postman
![Screenshot](/public/postman.png)



