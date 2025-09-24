// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // Sequelize instance from models/index.js
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const reviewRoutes = require('./routes/reviews');



const app = express();
app.use(cors());
app.use(express.json()); // parse JSON body

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/', reviewRoutes);




// simple test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync({ alter: true }); 
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err);
  }
})();
