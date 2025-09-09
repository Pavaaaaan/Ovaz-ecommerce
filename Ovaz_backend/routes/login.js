const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Signup = require('../model/signup');
const Login = require('../model/login'); 

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const user = await Signup.findOne({ email });

    if (!user) {
      // Log failed login
      await Login.create({ email, success: false });
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // Log success or failure
    await Login.create({ email, success: isMatch });

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email
    };

    res.status(200).json({ message: 'Login successful', user: userWithoutPassword });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

module.exports = router;
