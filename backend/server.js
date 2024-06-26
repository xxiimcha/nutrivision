require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/nutrivision', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const adminRoutes = require('./routes/admins');
const logRoutes = require('./routes/logs');

app.use('/api/signup', signupRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/logs', logRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
