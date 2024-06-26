// routes/logs.js
const express = require('express');
const Log = require('../models/Log');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const logs = await Log.find().sort({ time: -1 });
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: 'Error fetching logs' });
  }
});

module.exports = router;
