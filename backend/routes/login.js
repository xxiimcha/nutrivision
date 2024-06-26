const express = require('express');
const User = require('../models/Users');
const Log = require('../models/Log');
const router = express.Router();

const defaultCredentials = {
  email: 'default@example.com',
  password: 'password123'
};

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  let user;

  try {
    let logType = 'fail';

    // Check if the provided email and password match the default credentials
    if (email === defaultCredentials.email && password === defaultCredentials.password) {
      logType = 'success';
      await Log.create({ email, type: logType, action: 'login' });
      return res.status(200).json({ status: 'success' });
    }

    // Otherwise, check the database for the user
    user = await User.findOne({ email });

    if (user && user.password === password) {
      logType = 'success';
      res.status(200).json({ status: 'success' });
    } else {
      res.status(401).json({ status: 'fail', message: 'Invalid credentials' });
    }

    // Log the login attempt
    await Log.create({ email, type: logType, action: 'login' });

  } catch (error) {
    res.status(500).json({ status: 'error', message: 'An error occurred' });

    // Log the error login attempt
    await Log.create({ email, type: 'fail', action: 'login' });
  }
});

module.exports = router;
