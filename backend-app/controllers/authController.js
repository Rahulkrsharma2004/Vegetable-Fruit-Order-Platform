const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

// Register Admin
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the admin already exists
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin in the database
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword, // Save the hashed password
    });

    if (admin) {
      res.status(201).json({
        message: 'Admin registered successfully',
        adminData: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
        },
        token: generateToken(admin._id), // Generate token
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin by email
    const admin = await Admin.findOne({ email });

    if (admin) {
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, admin.password);

      if (isMatch) {
        // Password matched
        res.json({
          message: 'Admin login successful',
          adminData: {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
          },
          token: generateToken(admin._id), // Generate token
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(401).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
