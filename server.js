const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors'); // <--- Make sure this line is present
const postRoutes = require('./routes/postRoutes'); // Assuming your post routes are here

const app = express();
const port = process.env.PORT || 8080;

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Middleware
// IMPORTANT: app.use(cors()) should come before your routes and body parsers
app.use(cors()); // <--- This line is CRUCIAL for allowing frontend requests

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded

// Routes
app.use('/api/posts', postRoutes); // Your post routes are typically under /api/posts

// Basic route for the root of the backend (optional, just for testing)
app.get('/', (req, res) => {
  res.send('Backend API is running!');
});

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`));