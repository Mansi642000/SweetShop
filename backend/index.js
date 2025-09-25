const express = require('express');
require('dotenv').config();
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.listen(process.env.PORT || 5000, () => console.log(`✅ Server running on http://localhost:${process.env.PORT || 5000}`));