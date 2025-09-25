it('POST /api/auth/register should return 400 for missing fields', async () => {
  const response = await request(app)
    .post('/api/auth/register')
    .send({ username: 'testuser' }); // No password
  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty('message', 'Username and password are required');
});

it('POST /api/auth/register should return 400 for duplicate username', async () => {
  await pool.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3)', [
    'testuser',
    'hashedpassword',
    'user',
  ]);
  const response = await request(app)
    .post('/api/auth/register')
    .send({ username: 'testuser', password: 'Test@123' });
  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty('message', 'Username already exists');
});