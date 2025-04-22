const express = require('express');
const cors = require('cors');
require('dotenv').config();
const prisma = require('./lib/prisma');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.post('/api/books', async (req, res) => {
  try {
    const { title, author , isbn, publication_year, genre } = req.body;
    const books = await prisma.Book.create({
      data: {
        title,
        author,
        isbn,
        publication_year,
        genre
      },
    });
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/books', async (req, res) => {
  try {
    const books = await prisma.Book.findMany();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 