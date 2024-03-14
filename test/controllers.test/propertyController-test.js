const request = require('supertest');
const app = require('../app.js');

describe('Property Controller', () => {
  it('should return 201 and the created property when creating a property', async () => {
    const response = await request(app)
      .post('/properties')
      .send({ address: '123 Main St', price: 100000, bedrooms: 3 });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('property');
  });

  // Add more tests for updateProperty and deleteProperty
});
