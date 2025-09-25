const request = require('supertest');
const app = require('../../index');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

describe('Sweets API', () => {
  let token;
  let adminId;

  beforeAll(async () => {
    // Clean up old admin user if exists
    await pool.query('DELETE FROM users WHERE username = $1', ['adminuser']);

    // Insert test admin user
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    const result = await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id',
      ['adminuser', hashedPassword, 'admin']
    );

    adminId = result.rows[0].id;

    // Generate JWT with real DB user ID
    token = jwt.sign({ id: adminId, username: 'adminuser', role: 'admin' }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    // Clean up DB + close pool
    await pool.query('DELETE FROM users WHERE username = $1', ['adminuser']);
    await pool.end();
  });

  it('POST /api/sweets should add a new sweet for admin', async () => {
    const response = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Chocolate Bar',
        category: 'Candy',
        price: 2.99,
        quantity: 100,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Chocolate Bar');
  });
});
