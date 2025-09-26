const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db');
const authRoutes = require('./src/routes/authRoutes');
const sweetsRoutes = require('./src/routes/sweetsRoutes');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);

// Test DB route
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// Start server only if not required by a test
if (require.main === module) {
  app.listen(process.env.PORT || 5000, () =>
    console.log(`✅ Server running on http://localhost:${process.env.PORT || 5000}`)
  );
}

// Export for testing
module.exports = app;
