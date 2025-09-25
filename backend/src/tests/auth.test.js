const request = require('supertest');
const app = require('../index');

describe('Auth API', () => {
  it('POST /api/auth/register should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'Test@123',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });
});