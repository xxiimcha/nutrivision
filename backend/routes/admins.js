const express = require('express');
const Admin = require('../models/Admin');
const Log = require('../models/Log');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Correctly require bcryptjs

// POST /api/admins - Create a new admin
router.post('/', async (req, res) => {
  const { firstName, lastName, email, role } = req.body;
  
  // Generate a random password for the admin
  const password = Math.random().toString(36).slice(-8);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword
    });

    const savedAdmin = await newAdmin.save();

    // Log the creation of the new admin
    await Log.create({
      email: savedAdmin.email,
      type: 'success',
      action: 'create_admin'
    });

    res.status(201).json({ ...savedAdmin.toObject(), password });

  } catch (error) {
    console.error("Error creating admin:", error);
    await Log.create({
      email,
      type: 'fail',
      action: 'create_admin'
    });
    res.status(500).json({ message: 'Error creating admin' });
  }
});

// GET /api/admins - Retrieve all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ message: 'Error fetching admins' });
  }
});

// DELETE /api/admins/:id - Delete an admin
router.delete('/:id', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    await admin.remove();

    // Log the deletion of the admin
    await Log.create({
      email: admin.email,
      type: 'success',
      action: 'delete_admin'
    });

    res.status(200).json({ message: 'Admin deleted' });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ message: 'Error deleting admin' });
  }
});

module.exports = router;
