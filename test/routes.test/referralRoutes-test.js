const request = require('supertest');
const app = require('../app.js'); 
const mongoose = require('mongoose');
const Referral = require('../models/referralModels.js');  

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect('mongodb://127.0.0.1:27017/testdb', );
});

afterEach(async () => {
  // Clear database after each test
  await Referral.deleteMany();
});

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
});

describe('Referral Routes', () => {
  test('POST /referral', async () => {
    const res = await request(app)
      .post('/referral')
      .send({
        referrer: 'user1',
        referredUser: 'user2',
        bonusGranted: false
      });
      
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.referrer).toBe('user1');
    expect(res.body.referredUser).toBe('user2');
    expect(res.body.bonusGranted).toBe(false);
  });

  // Add more tests for referral routes as needed
});
