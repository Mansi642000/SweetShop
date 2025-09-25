const request = require('supertest');
const app = require('../../index');   // Express app
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

beforeEach(async () => {
  // clean up test users before each test
  await pool.query('DELETE FROM users WHERE username = $1', ['testuser']);
});

afterAll(async () => {
  await pool.end(); // close DB connection after tests
});

it('POST /api/auth/register should return 400 for missing fields', async () => {
  const response = await request(app)
    .post('/api/auth/register')
    .send({ username: 'testuser' }); // missing password

  expect(response.status).toBe(400);
});

it('POST /api/auth/register should return 400 for duplicate username', async () => {
  await pool.query(
    'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)',
    ['testuser', 'hashedpassword', 'user']
  );

  const response = await request(app)
    .post('/api/auth/register')
    .send({ username: 'testuser', password: 'anypass' });

  expect(response.status).toBe(400);
});

it('POST /api/auth/login should log in a user with valid credentials', async () => {
  const hashedPassword = await bcrypt.hash('Test@123', 10);

  await pool.query(
    'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)',
    ['testuser', hashedPassword, 'user']
  );

  const response = await request(app)
    .post('/api/auth/login')
    .send({ username: 'testuser', password: 'Test@123' });

  expect(response.status).toBe(200);
  expect(response.body.token).toBeDefined();
});
