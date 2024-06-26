const express = require('express');
const User = require('../models/Users'); // Ensure this path is correct based on your project structure
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ status: 'fail', message: 'User already exists' });
    }

    // Create a new user
    user = new User({ username, email, password });
    await user.save();
    
    res.status(201).json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: 'Server error' });
  }
});

module.exports = router;
