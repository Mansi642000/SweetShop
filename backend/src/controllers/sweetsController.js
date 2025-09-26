const pool = require('../../config/db');

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

const getSweets = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sweets');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  let query = 'SELECT * FROM sweets WHERE 1=1';
  const values = [];
  let index = 1;

  if (name) {
    query += ` AND name ILIKE $${index}`;
    values.push(`%${name}%`);
    index++;
  }
  if (category) {
    query += ` AND category ILIKE $${index}`;
    values.push(`%${category}%`);
    index++;
  }
  if (minPrice) {
    query += ` AND price >= $${index}`;
    values.push(minPrice);
    index++;
  }
  if (maxPrice) {
    query += ` AND price <= $${index}`;
    values.push(maxPrice);
  }

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateSweet = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, quantity } = req.body;

  try {
    const result = await pool.query(
      'UPDATE sweets SET name = $1, category = $2, price = $3, quantity = $4 WHERE id = $5 RETURNING *',
      [name, category, price, quantity, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteSweet = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM sweets WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    res.json({ message: 'Sweet deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const purchaseSweet = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE sweets SET quantity = quantity - 1 WHERE id = $1 AND quantity > 0 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Sweet out of stock or not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const restockSweet = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const result = await pool.query(
      'UPDATE sweets SET quantity = quantity + $1 WHERE id = $2 RETURNING *',
      [quantity, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
};