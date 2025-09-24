const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const reviewRoutes = require('./routes/reviews');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/', reviewRoutes);


//demo check
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync({ alter: true });  //helps to adjust table according to changes made
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();
