// models/Log.js
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['success', 'fail'],
    required: true
  },
  action: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Log', logSchema);
