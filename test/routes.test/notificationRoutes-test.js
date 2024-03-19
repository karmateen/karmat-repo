const request = require('supertest');
const app = require('../app.js');
const mongoose = require('mongoose');
const Notification = require('../models/notificationModels.js');

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect('mongodb://127.0.0.1:27017/testdb', );
});

afterEach(async () => {
  // Clear database after each test
  await Notification.deleteMany();
});

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
});

describe('Notification Routes', () => {
  test('POST /notification', async () => {
    const res = await request(app)
      .post('/notification')
      .send({
        recipient: 'user1',
        message: 'You have a new message'
      });
      
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.recipient).toBe('user1');
    expect(res.body.message).toBe('You have a new message');
  });

  // Add more tests for notification routes as needed
});
