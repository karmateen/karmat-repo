const request = require('supertest');
const app = require('../app.js');

describe('Auth Routes', () => {
  it('should return 200 and a token when logging in with valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  // Add more tests for logout and register
});
