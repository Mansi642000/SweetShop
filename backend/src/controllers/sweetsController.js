const pool = require('../config/db');

const createSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;

  if (!name || !category || !price || !quantity) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO sweets (name, category, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, category, price, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createSweet };