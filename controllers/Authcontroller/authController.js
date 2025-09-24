const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({ name, email, passwordHash });

    return res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Check password
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' });

    // Create token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signup, login };
