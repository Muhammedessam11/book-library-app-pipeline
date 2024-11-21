const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Configure MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'library',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    process.exit(1); // Exit if the database connection fails
  }
  console.log('Connected to MySQL database');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Get all books
app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      return res.status(500).json({ error: 'Failed to fetch books' });
    }
    res.json(results);
  });
});

// Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  db.query('INSERT INTO books (title, author) VALUES (?, ?)', [title, author], (err, result) => {
    if (err) {
      console.error('Error adding book:', err);
      return res.status(500).json({ error: 'Failed to add book' });
    }
    res.status(201).json({ id: result.insertId, title, author });
  });
});

// 404 handler for unsupported routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

