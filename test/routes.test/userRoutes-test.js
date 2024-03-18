const request = require('supertest');
const app = require('../app.js');

describe('User Routes', () => {
  it('should return 201 and the created user when creating a user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'John Doe', email: 'john@example.com', password: 'password' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('user');
  });

  // Add more tests for updateUser and deleteUser
});
